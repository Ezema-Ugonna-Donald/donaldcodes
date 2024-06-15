"use client"

import { FormEvent, useEffect, useState } from "react"
import axios from "@/app/(main)/api/axios"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import Editor from "../../../../../../ckeditor5/build/ckeditor";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

type User = {
    id: number
    name: string
    email: string
    password: string
    created_by: string
    created_at: string
}

type Category = {
    id: number
    user_id: number
    categoryname: string
    created_at: string
    user: User
}

type Post = {
    id: number
    title: string
    user: User
    user_id: number
    categories: string
    post_image: string
    body: string
    no_approved_comments: number
    created_at: string
}

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!
    }
})

export default function EditPost({params}: {
    params: { postId: string }
}) {
    const [title, setTitle] = useState<string>("")
    const [cat, setCat] = useState<string>("")
    const [postImage, setPostImage] = useState<File | null>(null)
    const [postImageUrl, setPostImageUrl] = useState<string>("")
    const [postBody, setPostBody] = useState<string>("")
    const [success, setSuccess] = useState<Boolean>(false)
    const [error, setError] = useState<Boolean>(false)

    const CATEGORY_URL: string = "/categories"
    const POST_GET_URL: string = "/posts/view"
    const POST_UPDATE_URL: string = "/posts"

    const [categories, setCategories] = useState<Category[]>([])
    const [post, setPost] = useState<Post>({
        id: 0,
        title: "",
        user: {
            id: 0,
            name: "",
            email: "",
            password: "",
            created_by: "",
            created_at: ""
        },
        user_id: 0,
        categories: "",
        post_image: "",
        body: "",
        no_approved_comments: 0,
        created_at: ""
    })

    const getPostById = async (id: number) => {
        try
        {
            var response = await axios.get(`${POST_GET_URL}/${id}`)

            if (response?.status === 200)
            {
                setPost(response.data)
                // if (post !== undefined)
                // {
                //     setTitle(post.title)
                //     setCat(post.categories)
                //     setPostBody(post.body)
                //     setPostImageUrl(post.post_image)
                // }
            }
        }
        catch(error)
        {
            console.error(error)
        }
    } 

    const getCategories = async () => {
        try
        {
            const response = await axios.get(CATEGORY_URL)

            if (response?.status === 200)
            {
                setCategories(response.data)
            }
        }
        catch(error)
        {
            console.error(error)
        }

    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setPostImage(e.target.files[0]) 
    }

    const uploadImage = async (e: FormEvent<HTMLFormElement>, title: string, category: string, postImage: File, body: string) => {
        e.preventDefault()

        if (postImage.size > 0)
        {
            const buffer = Buffer.from(await postImage.arrayBuffer())

            const fileBuffer = buffer

            const key = `${postImage.name}`

            const params = {
                Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
                Key: key,
                Body: fileBuffer
            }

            const command = new PutObjectCommand(params)

            try
            {
                const response = await s3Client.send(command)

                await updatePost(title, category, `https://donaldcodes-blog.s3.eu-west-2.amazonaws.com/${key}`, body)
            }
            catch(error)
            {
                throw error
            }
        }
    }

    const updatePost = async (title: string, category: string, postImageUrl: string, body: string) => {
        try 
        {
            const response = await axios.patch(`${POST_UPDATE_URL}/${params.postId}`, {
                user_id: 5,
                title: title,
                categories: category,
                post_image: postImageUrl,
                body: body
            })

            if (response?.status === 200)
            {
                setSuccess(true)
                setError(false)
            }
            else
            {
                setError(true)
                setSuccess(false)
            }
        } 
        catch (error) 
        {
            console.error(error)    
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getCategories()
            await getPostById(Number(params.postId))
        }

        fetchData()
    }, [])

    return (
        <section className="p-8">
            <h1 className="font-[Lato-Bold] text-xl">Edit Post</h1>
            {success ? (<div className="bg-green-500 p-4 mx-2 text-black my-5 w-1/2">Post Updated successfully.</div>): null}
            {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5 w-1/2">Failed to update post</div>): null}
            <form className="mt-5" onSubmit={ async (e: FormEvent<HTMLFormElement>) => await uploadImage(e, title, cat, postImage!, postBody)}>
                <div className="mb-3">
                    <span className="block">Selected Title: {post.title}</span>
                    <label className="block" htmlFor="title">Title:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="title" id="title" placeholder="Enter title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <span className="block">Selected Category: {post.categories}</span>
                    <label className="block" htmlFor="category">Category:</label>
                    <select className="w-1/2 outline-none h-12 border bg-white border-black p-3 rounded-md" name="category" id="category" value={cat} onChange={e => setCat(e.target.value)}>
                        <option value="" disabled>Select-Category</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.categoryname}>{category.categoryname}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="postImage">Post Image:</label>
                    <input className="w-1/2 outline-none h-12 border mb-3 border-black p-3 rounded-md" type="file" name="postImage" id="postImage" accept="image/*" onChange={handleFileChange} />
                    <img src={post?.post_image} className="w-[25%]" alt="Post image for decorative purpose" />
                    <span className="block">Selected Image</span>
                </div>
                <div className="mb-3 w-1/2">
                    <label className="block">Post Body:</label>
                    <CKEditor
                        editor={ Editor.Editor }
                        // config={ editorConfiguration }
                        data={post.body}
                        onChange={ (event, editor ) => {
                            const data = editor.getData();
                            setPostBody(data.toString())
                            // console.log( { event, editor, data } );
                        } }
                    />
                </div>
                <button className="bg-[#15eb5c] border border-black rounded-md w-1/2 h-12" type="submit">Update Post</button>
            </form>
        </section>
    )
}