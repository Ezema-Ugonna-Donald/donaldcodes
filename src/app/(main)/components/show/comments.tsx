"use client"

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import axios from "@/app/(main)/api/axios";
import { FaUser, FaAt, FaGlobe } from "react-icons/fa";

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

export default function Comments(props: { postId: string }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [commentator, setCommentator] = useState("")
    const [commentatorWebsite, setCommentatorWebsite] = useState("")
    const [comment, setComment] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const COMMENT_URL = "/comments"

    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const getCommentsByPost = async () => {
        try 
        {
            const response = await axios.get(`${COMMENT_URL}/${props.postId}`)

            if (response?.status === 200)
            {
                setComments(response.data)
            }   
        } 
        catch (error) 
        {
            console.error(error)
        }
    }

    const postComment = async (e: FormEvent<HTMLFormElement>) => {
        try 
        {
            e.preventDefault()

            const response = await axios.post(`${COMMENT_URL}`, {
                name: commentator,
                post_id: props.postId,
                website: commentatorWebsite,
                comment: comment
            })

            console.log(response.status, "status")
    
            if (response?.status === 201)
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
            await getCommentsByPost()
        }

        const timer = setTimeout(() => {
            setError(false)
            setSuccess(false)
        }, 3500)

        fetchData()

        return () => clearTimeout(timer)
    }, [success, error])

    return (
        <section>
            {
                comments.length > 0 ?
                (
                    <div className="w-full p-4 mb-8 text-black bg-[#E4EB15]">
                            <div className="p-3 mb-3"><h1 className="text-xl text-left">Comments about this post</h1></div>
                            {
                                comments.map(comment => (
                                    <div className="mb-10" key={comment.id}>
                                        <div className="flex p-3 bg-[#ec0b43] mx-2 text-white border-l-2 border-[#E4EB15] border-r-2 border-t-2">
                                            <div className="basis-1/4 ml-3">
                                                <img className="w-16 rounded-full" src="/assets/icons/user.jpg" alt="Comment Icon" />
                                            </div>
                                            <div className="basis-3/4 text-left -ml-14 mt-2 align-middle">
                                                <div className="">
                                                    <div className="">{comment.name}</div>
                                                    <Link href={comment.website} className="underline text-blue-50">{comment.website}</Link>
                                                    <div className="">{new Date(comment.created_at).toLocaleDateString("en-US", options)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-[#ec0b43] mx-2.5 p-3 text-left text-white">{comment.comment}</div>
                                    </div>
                                ))
                            }
                    </div>
                    
                ): null
            }
            <div className="w-full p-4 mb-8 mt-14 text-black bg-[#E4EB15]">
                <form onSubmit={(e) => postComment(e)} method="post">
                    <div className="">
                        <div className="p-5">
                            <h1 className="text-xl text-left">Share your comments about this post</h1>
                            <h4 className="text-left">Please, try to be nice</h4>
                        </div>
                        {success ? (<div className="bg-green-500 p-4 mx-2 text-black my-5">Thanks for your contribution</div>): null}
                        {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5">Failed to submit comment</div>): null}
                        <div className="p-4 mx-2 bg-[#ec0b43]">
                            <div className="w-full mb-2">
                                <label htmlFor="commentator" className="text-left block text-white">Name: </label>
                                <div className="bg-white rounded-md border-solid flex border-black">
                                    <span className="p-3 pt-3.5 inline"><FaUser /></span>
                                    <input className="w-[90%] outline-none border-none h-11 placeholder:text-[#413b40]" value={commentator} onChange={(e) => setCommentator(e.target.value)} type="text" name="commentator" id="commentator" placeholder="Enter name..." />
                                </div>
                            </div>
                            <div className="w-full mb-2">
                                <label htmlFor="commentatorWebsite" className="text-left block text-white">Website (optional): </label>
                                <div className="bg-white rounded-md border-solid flex border-black">
                                    <span className="p-3 pt-3.5 inline"><FaGlobe /></span>
                                    <input className="w-[90%] outline-none border-none h-11 placeholder:text-[#413b40]" value={commentatorWebsite} onChange={(e) => setCommentatorWebsite(e.target.value)} type="text" name="commentatorWebsite" id="commentatorWebsite" placeholder="https://" />
                                </div>
                            </div>
                            <div className="w-full mb-2">
                                <label htmlFor="comment" className="text-left block text-white">Comment: </label>
                                <textarea name="comment" id="comment" className="w-full h-28 rounded-md p-3 border-solid border-black" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Please enter comment here..."></textarea>
                            </div>
                            <div className="">
                                <button disabled={!commentator && !comment} className="w-full p-3 bg-black text-white rounded-md transition-colors delay-150 hover:bg-slate-900" type="submit">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}