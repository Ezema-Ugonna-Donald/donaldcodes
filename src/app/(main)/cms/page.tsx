"use client"

import { useEffect, useState } from "react";
import { FaAd, FaClipboard, FaCommentSlash, FaComments, FaEdit, FaTrash } from "react-icons/fa";
import axios from "@/app/(main)/api/axios";
import Pagination from "@/app/(main)/components/show/post/pagination";
import parse from "html-react-parser"
import Link from "next/link";

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

type Comment = {
    id: number
    post_id: number
    name: string
    email: string
    website: string
    comment: string
    approved_by: string
    status: string
    created_at: string
    post: Post
}

type Ad = {
    id: number
    user_id: number
    companyname: string
    companyEmail: string
    companyPhone: string
    companyWebsite: string
    adImage: string
    body: string
    user: User,
    created_at: string
    updated_at: string
}

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([])
    const [approvedComments, setApprovedComments] = useState<Comment[]>([])
    const [ads, setAds] = useState<Ad[]>([])

    const POSTS_URL: string = "/posts/view"
    const POST_DELETE_URL: string = "/posts"
    const COMMENT_APPROVED_URL: string = "/comments/all/approved"
    const COMMENT_DISAPPROVED_URL: string = "/comments/all/disapproved"
    const AD_GET_URL: string = "/ads"
    let no: number = 0

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4)

    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const paginationAttributes = {
        currentPage,
        postsPerPage,
        totalPosts: posts.length
    }

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const onPageChange= (pageNumber: number)=>{
        setCurrentPage(pageNumber);
    }

    const getAllPosts = async () => {
        try
        {
          const response = await axios.get(POSTS_URL)
    
          if (response?.status === 200)
          {
            // console.log("how na", response.data)
            setPosts(response.data)
            // return response.data
          }
        }
        catch(error) 
        {
          console.error(error)
        }
    }

    const getAllApprovedComments = async () => {
        try
        {
            const response = await axios.get(COMMENT_APPROVED_URL)
        
            if (response?.status === 200)
            {
                // console.log("how na", response.data)
                setApprovedComments(response.data)
                // return response.data
            }
        }
        catch(error) 
        {
          console.error(error)
        }
    }

    const getAds = async () => {
        try 
        {
            const response = await axios.get(AD_GET_URL)

            if (response?.status === 200)
            {
                setAds(response.data)
            }
        } 
        catch (error) 
        {
            console.error(error)   
        }
    }

    const deletePost = async (id: number) => {
        try
        {
            const response = await axios.delete(`${POST_DELETE_URL}/${id}`)

            if (response?.status === 200)
            {
                await getAllPosts()
            }
        } 
        catch (error)
        {
            console.error(error)
        }
    }

    // const getAllDisapprovedComments = async () => {
    //     try
    //     {
    //       const response = await axios.get(COMMENT_DISAPPROVED_URL)
    
    //       if (response?.status === 200)
    //       {
    //         // console.log("how na", response.data)
    //         setDisapprovedComments(response.data)
    //         // return response.data
    //       }
    //     }
    //     catch(error) 
    //     {
    //       console.error(error)
    //     }
    // }

    useEffect(() => {
        const fetchData = async () => {
            await getAllPosts()
            await getAllApprovedComments()
            await getAds()
          // console.log("posets", posts)
        }
    
        fetchData()
      }, [currentPage])

    return (
        <section className="p-8">
            <div className="grid grid-cols-3 gap-3">
                <div className="shadow-lg rounded-xl p-7 text-center">
                    <div className="flex justify-center"><span className="mt-1.5 mr-4"><FaClipboard size={19} /></span><span className="text-xl font-bold">No of Posts</span></div>
                    <div className="text-center text-3xl font-bold mt-10">{posts.length}</div>
                </div>
                <div className="shadow-lg rounded-xl p-7 text-center">
                    <div className="flex justify-center"><span className="mt-1.5 mr-4"><FaComments size={19} /></span><span className="text-xl font-bold">Approved Comments</span></div>
                    <div className="text-center text-3xl font-bold mt-10">{approvedComments.length}</div>
                </div>
                <div className="shadow-lg rounded-xl p-7 text-center">
                    <div className="flex justify-center"><span className="mt-1.5 mr-4"><FaAd size={19} /></span><span className="text-xl font-bold">No of Ads</span></div>
                    <div className="text-center text-3xl font-bold mt-10">{ads.length}</div>
                </div>
            </div>
            <div className="mt-8">
                <table className="table-fixed border-collapse border-spacing-2">
                    <thead className="bg-[#E4EB15]">
                        <tr className="">
                            <th className="p-4">No.</th>
                            <th className="p-4">Post Image</th>
                            <th className="p-4">Post Summary</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.map(post => {
                                no++

                                return (
                                    <tr key={post.id}>
                                        <td className="p-4">{no + indexOfFirstPost}</td>
                                        <td className="p-4"><img src="/assets/uploads/neoyokio.png" className="h-[100px] w-[200px]" alt="" /></td>
                                        <td className="p-4 w-80">{parse(post.body.substring(0, 100))}...</td>
                                        <td className="p-4">{new Date(post.created_at).toLocaleDateString("en-US", options)}</td>
                                        <td className="p-4 flex align-middle pt-14"><Link href={`/cms/edit-post/${post.id}`} className="mr-3"><FaEdit color="#4b6dca" /></Link><span className="cursor-pointer" onClick={() => deletePost(post.id)}><FaTrash color="#f76186" /></span></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Pagination {...paginationAttributes}
                    onPageChange={onPageChange}
                    paginate={paginate}
                />
            </div>
        </section>
    )
}