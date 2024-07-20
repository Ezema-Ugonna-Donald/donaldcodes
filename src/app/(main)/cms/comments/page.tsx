"use client"

import { useEffect, useState } from "react"
import axios from "@/app/(main)/api/axios"
import { FaBomb, FaCheckCircle, FaTrash } from "react-icons/fa"
import useAxiosPrivate from "@/app/(main)/hooks/useAxiosPrivate"

type Post = {
    id: number
    title: string
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

export default function ViewComments() {
    const [approvedComments, setApprovedComments] = useState<Comment[]>([])
    const [disapprovedComments, setDisapprovedComments] = useState<Comment[]>([])

    const COMMENT_APPROVED_URL = "/comments/all/approved"
    const COMMENT_DISAPPROVED_URL = "/comments/all/disapproved"
    const COMMENT_SET_APPROVED_URL = "/comments/approve"
    const COMMENT_SET_DISAPPROVED_URL = "/comments/disapprove"
    const COMMENT_DELETE_URL = "/comments"
    // let no: number = 0
    
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const axiosPrivate = useAxiosPrivate()

    const getApprovedComments = async () => {
        try 
        {
            const response = await axios.get(COMMENT_APPROVED_URL)

            if (response?.status === 200)
            {
                setApprovedComments(response.data)
            }
        } 
        catch (error) 
        {
            console.error(error)  
        }
    }

    const getDisapprovedComments = async () => {
        try 
        {
            const response = await axiosPrivate.get(COMMENT_DISAPPROVED_URL)

            if (response?.status === 200)
            {
                setDisapprovedComments(response.data)
            }
        } 
        catch (error) 
        {
            console.error(error)  
        }
    }

    const setApproved = async (id: number) => {
        try 
        {
            const response = await axiosPrivate.patch(COMMENT_SET_APPROVED_URL, {
                id: id
            })

            if (response?.status === 200)
            {
                await getApprovedComments()
                await getDisapprovedComments()
            }
        } 
        catch (error) 
        {
            console.error(error)    
        }
    }

    const setDisapproved = async (id: number) => {
        try 
        {
            const response = await axiosPrivate.patch(COMMENT_SET_DISAPPROVED_URL, {
                id: id
            })

            if (response?.status === 200)
            {
                await getApprovedComments()
                await getDisapprovedComments()
            }
        } 
        catch (error) 
        {
            console.error(error)    
        }
    }

    const deleteComment = async (id: number) => {
        try 
        {
            const response = await axiosPrivate.delete(`${COMMENT_DELETE_URL}/${id}`)

            if (response?.status === 200)
            {
                await getApprovedComments()
                await getDisapprovedComments()
            }
        } 
        catch (error) 
        {
            console.error(error)    
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getApprovedComments()
            await getDisapprovedComments()
        }

        fetchData()

    }, [])

    return (
        <section className="p-8">
            <h1 className="font-[Lato-Bold] text-xl">Manage Comments</h1>
            <div className="my-4">
                <h2 className="text-lg">Approved Comments</h2>
                <div className="mt-8">
                    <table className="border-collapse border-spacing-2">
                        <thead className="bg-[#E4EB15]">
                            <tr className="">
                                <th className="p-4">No.</th>
                                <th className="p-4">Commentator</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Website</th>
                                <th className="p-4">Comment</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                approvedComments.map(comment => {
                                    let no: number = 0
                                    no++

                                    return (
                                        <tr key={comment.id}>
                                            <td className="p-4">{no}</td>
                                            <td className="p-4">{comment.name}</td>
                                            <td className="p-4">{comment.email == "" ? "None" : comment.email}</td>
                                            <td className="p-4">{comment.website == "" ? "None" : comment.website}</td>
                                            <td className="p-4">{comment.comment}</td>
                                            <td className="p-4">{new Date(comment.created_at).toLocaleDateString("en-US", options)}</td>
                                            <td className="p-4 flex align-middle"><span className="cursor-pointer" onClick={() => setDisapproved(comment.id)}><FaBomb color="#4b6dca" /></span><span className="cursor-pointer" onClick={() => deleteComment(comment.id)}><FaTrash color="#f76186" /></span></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h2 className="text-lg">Disapproved Comments</h2>
                <div className="mt-8">
                    <table className="table-fixed border-collapse border-spacing-2">
                        <thead className="bg-[#E4EB15]">
                            <tr className="">
                                <th className="p-4">No.</th>
                                <th className="p-4">Commentator</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Website</th>
                                <th className="p-4">Comment</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                disapprovedComments.map(comment => {
                                    let no: number = 0
                                    no++

                                    return (
                                        <tr key={comment.id}>
                                            <td className="p-4">{no}</td>
                                            <td className="p-4">{comment.name}</td>
                                            <td className="p-4">{comment.email == "" ? "None" : comment.email}</td>
                                            <td className="p-4">{comment.website == "" ? "None" : comment.website}</td>
                                            <td className="p-4">{comment.comment}</td>
                                            <td className="p-4">{new Date(comment.created_at).toLocaleDateString("en-US", options)}</td>
                                            <td className="p-4 flex align-middle"><span className="cursor-pointer" onClick={() => setApproved(comment.id)}><FaCheckCircle color="#4b6dca" /></span><span className="cursor-pointer" onClick={() => deleteComment(comment.id)}><FaTrash color="#f76186" /></span></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}