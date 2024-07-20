"use client"

import axios from "@/app/(main)/api/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import parse from "html-react-parser"
import Pagination from "@/app/(main)/components/home/experience/landing/post/pagination";

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

export default function Posts(props: {categoryname: string}) {

    const POSTS_URL = "/posts/view/category"

    const pageNumberLimit = 4;
    const [posts, setPosts] = useState<Post[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(4)
    const [maxPageLimit, setMaxPageLimit] = useState(4);
    const [minPageLimit, setMinPageLimit] = useState(0);

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

    const getAllPostsByCategory = async () => {
        try
        {
          const response = await axios.get(`${POSTS_URL}/${props.categoryname}`)
    
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

    useEffect(() => {
        const fetchData = async () => {
          await getAllPostsByCategory()
    
          // console.log("posets", posts)
        }
    
        fetchData()
      }, [currentPage])

    return (
        <section className="w-full">
        {
          posts.length > 0 ?
          (
            currentPosts.map(post => 
              (
                  <div className="w-full mb-24 text-[#FDE8E9]" key={post.id}>
                      <h1 className="text-5xl font-[Oswald-Bold] text-left uppercase">{post.title}</h1>
                      <div className="border rounded-md mt-12">
                      <img src={post.post_image} className="rounded-md" alt="" />
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
                        <div className="break-words text-base text-left mt-6"><span>{parse(post.body.substring(0, 115))}</span><span>...</span></div>
                        <Link href={`/view/${post.id}`} className="float-right hover:text-[#E4EB15] hover:underline cursor-pointer">Read More &gt;&gt;</Link>
                      </div>
                  </div>
              )
            )
          ) : 
          (
            <h1 className="text-5xl font-[Oswald-Bold] uppercase text-[#FDE8E9]">Loading...</h1>
          )
        }
        <Pagination {...paginationAttributes}
            //   onPrevClick={onPrevClick} 
            //   onNextClick={onNextClick}
              onPageChange={onPageChange}
              paginate={paginate}
            />
      </section>  
    )
}