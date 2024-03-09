import React, { useEffect, useState } from 'react'
import PostImg from "./../../../assets/uploads/neoyokio.png"
import axios from "./../../../api/axios"
import parse from "html-react-parser"

const RecentPosts = () => {
  const POSTS_URL = "/posts/view"
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  const [posts, setPosts] = useState([])

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
        <div className="flex items-center cursor-pointer hover:text-[#ec0b43] mb-4" key={post.id}>
          <div className="basis-1/3">
              <img src={PostImg} alt="" />
          </div>
          <div className="basis-2/3 ml-3">
              <div className="block">
                  <p className="text-lg uppercase font-bold">{post.title}</p>
                  <p className="text-sm">{new Date(post.created_at).toLocaleDateString("en-US", options)}</p>
              </div>
          </div>
      </div>
      ))
    ) :
    (
      <p className="text-lg uppercase font-bold">Loading..</p>
    )
  )
}

export default RecentPosts