import React from 'react'
import RecentPosts from './Sidearea/RecentPosts'

const Sidearea = () => {
  return (
    <section className="">
        <div className="w-full mb-[15%] rounded-sm h-auto pb-[0.5px]">
            <div className="rounded-sm font-[Lato-Regular] border-r-[3px] border-r-[#ec0b43] border-t-[3px] border-t-[#ec0b43] border-l-[3px] border-l-[#ec0b43] bg-[#E4EB15]">
                <div className="bg-[#FDE8E9] text-[#000] p-3 pl-5 text-left">Categories</div>
                <div className="p-5 text-left">
                    <span className="block cursor-pointer hover:text-[#ec0b43]">HTML</span>
                    <span className="block cursor-pointer hover:text-[#ec0b43]">CSS</span>
                    <span className="block cursor-pointer hover:text-[#ec0b43]">JavaScript</span>
                </div>
            </div>
        </div>
        <div className="w-full rounded-sm h-auto pb-[0.5px]">
            <div className="rounded-sm font-[Lato-Regular] border-r-[3px] border-r-[#ec0b43] border-t-[3px] border-t-[#ec0b43] border-l-[3px] border-l-[#ec0b43] bg-[#E4EB15]">
                <div className="bg-[#FDE8E9] text-[#000] p-3 pl-5 text-left">Recent Posts</div>
                <div className="p-5 text-left">
                    <RecentPosts />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Sidearea