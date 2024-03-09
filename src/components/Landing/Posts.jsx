import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import PostImg from "./../../assets/uploads/neoyokio.png"
import axios from "./../../api/axios"
// import parse from "html-react-parser"
import Pagination from './Post/Pagination'

const Posts = () => {

  const POSTS_URL = "/posts/view"

  const pageNumberLimit = 4;
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(4)
  const [maxPageLimit, setMaxPageLimit] = useState(4);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: posts
  }

  const getAllPosts = async () => {
    try
    {
      const response = await axios.get(POSTS_URL)

      if (response?.status === 200)
      {
        // console.log("how na", response.data)
        setPosts(response.data)
        return response.data
      }
    }
    catch(error) 
    {
      console.error(error)
    }
  }

  const onPageChange= (pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  const onPrevClick = ()=>{
      if((currentPage - 1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev => prev - 1);
  }

  const onNextClick = ()=>{
    if(currentPage + 1 > maxPageLimit){
        setMaxPageLimit(maxPageLimit + pageNumberLimit);
        setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage(prev => prev + 1);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await getAllPosts()

      // console.log("posets", posts)
    }

    fetchData()
  }, [currentPage])

  return (
    <section className="w-full">
      {
        posts.length > 0 ?
        ( 
          <Pagination {...paginationAttributes}
            onPrevClick={onPrevClick} 
            onNextClick={onNextClick}
            onPageChange={onPageChange}
          />
        ) : 
        (
          <h1 className="text-5xl font-[Oswald-Bold] uppercase text-[#FDE8E9]">Loading...</h1>
        )
      } 
    </section>
  )
}

export default Posts