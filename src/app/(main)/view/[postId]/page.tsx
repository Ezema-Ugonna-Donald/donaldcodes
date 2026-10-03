"use client";
import { use } from "react";
import Ad from "@/app/(main)/components/home/experience/landing/ad"
import Posts from "@/app/(main)/components/show/posts"
import Comments from "@/app/(main)/components/show/comments"
import SideArea from "@/app/(main)/components/home/experience/landing/sidearea"

export default function View(
    props: {
        params: Promise<{ postId: string }>
    }
) {
    const params = use(props.params);
    return (
        <main className="bg-black">
            <article className="w-screen align-bottom text-center mt-24">
                <Ad />
                <section className="w-screen 2xl:flex xl:flex lg:flex md:flex justify-around mt-20">
                    <div className="basis-3/6 sm:mx-11">
                        <Posts postId={params.postId} />
                        <Comments postId={params.postId} />
                    </div>
                    <div className="basis-2/6 sm:mx-11">
                        <SideArea />
                    </div>
                </section>
            </article>
        </main>
    )
}