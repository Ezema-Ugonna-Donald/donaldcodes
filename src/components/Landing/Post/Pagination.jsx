import React from 'react'

import PostImg from "./../../../assets/uploads/neoyokio.png"
import parse from "html-react-parser"

const Pagination = (props) => {

    const { currentPage, maxPageLimit, minPageLimit} = props
    const totalPages = props.response.length - 1
    const data = props.response
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const pages = [];

    for(let i = 1; i <= totalPages; i++)
    {
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }
    const handleNextClick = ()=>{
        props.onNextClick();
    }
    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    // const pageNumbers = 

    // const renderData = (data) => {
    //     return (
            
    //     )
    // }

    return (
        <>
            {
                data.slice(minPageLimit, maxPageLimit).map(post => 
                    (
                        <div className="w-full mb-24 text-[#FDE8E9]" key={post.id}>
                            <h1 className="text-5xl font-[Oswald-Bold] text-left uppercase">{post.title}</h1>
                            <div className="border rounded-md mt-12">
                            <img src={PostImg} className="rounded-md" alt="" />
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
                            <p className="break-words text-base text-left mt-6">{parse(post.body.substring(0, 115))}...</p>
                            <p className="float-right hover:text-[#E4EB15] hover:underline cursor-pointer">Read More &gt;&gt;</p>
                            </div>
                        </div>
                    )
                )
            }
            <div className="mb-3">
                <ul className="inline-flex cursor-pointer">
                    <li><button className="p-3 bg-[#FDE8E9] mx-1 text-black" onClick={handlePrevClick} disabled={currentPage === pages[0]}>&lt;</button></li>
                    {
                        minPageLimit >= 1 ? (<li className="p-3 bg-[#FDE8E9] mx-1 text-black" onClick={handlePrevClick}>&hellip;</li>) : null

                    }
                    {
                        pages.map(page =>
                            page <= maxPageLimit && page > minPageLimit ?
                            (
                                <li key={page} id={page} onClick={handlePageClick} 
                                    className={ currentPage === page ? "p-3 text-black bg-[#E4EB15] mx-1" : "p-3 bg-[#FDE8E9] mx-1 text-black"}>
                                    {page}
                                </li>
                            ) :
                            null
                        )
                    }
                    {
                        pages.length > maxPageLimit ? (<li className="p-3 bg-[#FDE8E9] mx-1 text-black" onClick={handleNextClick}>&hellip;</li>) : null
                    }
                    <li>
                        <button className="p-3 bg-[#FDE8E9] mx-1 text-black" onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>&gt;</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Pagination