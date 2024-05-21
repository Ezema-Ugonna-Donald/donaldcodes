"use client"

import axios from "@/app/(main)/api/axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser"

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

export default function Posts(props: {postId: string}) {

    const POSTS_URL = "/posts/view"
    const [post, setPost] = useState<Post>()
    const [isLoading, setIsLoading] = useState(true)

    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const getPostById = async () => {
      try
      {
      //   setIsLoading(true)
        const response = await axios.get(`${POSTS_URL}/${Number(props.postId)}`)

        //console.log("resposne", response.status)
  
        if (response?.status === 200)
        {
          // console.log("how na", response.data)
          setIsLoading(false)
          setPost(response.data)
          return response.data
        }
      }
      catch(error) 
      {
        console.error(error)
      }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getPostById()
    }

    fetchData()

    console.log("postna", post)
  }, [])
  

  return (
      <section>
          {
            post !== undefined  ? 
            (
              <div className="w-full mb-24 text-[#FDE8E9]" key={post.id}>
                  <h1 className="text-5xl font-[Oswald-Bold] text-left uppercase">{post.title}</h1>
                  <div className="border rounded-md mt-12">
                    <img src="/assets/uploads/neoyokio.png" className="rounded-md" alt="" />
                  </div>
                  <div className="flex justify-between">
                    <div className="mt-4 text-left">
                        <span className="font-bold text-sm">Published by {post.user == null ? "Ugonna Donald Ezema" : post.user.name} </span>
                    </div>
                    <div className="text-right mt-4 font-bold text-sm">
                        <span className="ml-5">{new Date(post.created_at).toLocaleDateString("en-US", options)}</span>
                    </div>
                  </div>
                  <hr className="border-[#FDE8E9]" />
                  <hr className="border-[#ec0b43]" />
                  <div className="w-full">
                      <div className="break-words text-base text-left mt-6">{parse(post.body)}</div>
                      {/* <div className="float-right hover:text-[#E4EB15] hover:underline cursor-pointer" onClick={() => SendToParent(Number(post.id))}>Read More &gt;&gt;</div> */}
                  </div>
              </div>  
            ):
            (
                <h1 className="text-5xl font-[Oswald-Bold] uppercase text-[#FDE8E9]">Loading...</h1>
            )
          }
      </section>
  )
}