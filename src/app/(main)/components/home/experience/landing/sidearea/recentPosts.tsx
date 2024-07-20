import axios from "@/app/(main)/api/axios"
import { useEffect, useState } from "react"
import Link from "next/link"

type User = {
    id: number
    name: string
    email: string
    password: string
    created_by: string
    created_at: string
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

export default function RecentPosts() {
    const POSTS_URL = "/posts/view"
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const [posts, setPosts] = useState<Post[]>([])

    const getAllPosts = async () => {
        try
        {
        const response = await axios.get(POSTS_URL)

        if (response?.status === 200)
        {
            // console.log("how na", response.data)
            setPosts(response.data.slice(0, 4))
            // return response.data
        }
        }
        catch(error) 
        {
        console.error(error)
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
        await getAllPosts()

        // console.log("posets", posts)
        }

        fetchData()
    }, [])

    return (
        posts.length > 0 ?
        (
            posts.map(post => (
                <Link href={`/view/${post.id}`} className="flex items-center cursor-pointer hover:text-[#ec0b43] mb-4" key={post.id}>
                    <div className="basis-1/3">
                        <img src={post.post_image} alt="" />
                    </div>
                    <div className="basis-2/3 ml-3">
                        <div className="block">
                            <p className="text-lg uppercase font-bold">{post.title}</p>
                            <p className="text-sm">{new Date(post.created_at).toLocaleDateString("en-US", options)}</p>
                        </div>
                    </div>
                </Link>
            ))
        ) :
        (
            <p className="text-lg uppercase font-bold">Loading..</p>
        )
    )
}