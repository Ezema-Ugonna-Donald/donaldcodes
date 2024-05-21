"use client"
import Ad from "@/app/(main)/components/home/experience/landing/ad"
import Posts from "@/app/(main)/components/show/posts"
import Comments from "@/app/(main)/components/show/comments"
import SideArea from "@/app/(main)/components/home/experience/landing/sidearea"

export default function View({params}: {
    params: { postId: string }
}) {
    return (
        <main className="bg-black">
            <article className="w-screen align-bottom text-center mt-24">
                <Ad />
                <section className="w-screen flex justify-around mt-20">
                    <div className="basis-3/6">
                        <Posts postId={params.postId} />
                        <Comments postId={params.postId} />
                    </div>
                    <div className="basis-2/6">
                        <SideArea />
                    </div>
                </section>
            </article>
        </main>
    )
}