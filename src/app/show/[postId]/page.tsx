"use client"
import Ad from "@/app/components/home/experience/landing/ad"
import Posts from "@/app/components/show/experience/landing/posts"
import Sidearea from "@/app/components/home/experience/landing"
import Comments from "@/app/components/show/comments"

export default function Show({params}: {
    params: { postId: string }
}) {
    return (
        <main className="bg-black">
            {/* <Canvas camera={{
                fov: 14,
                position: [1.19, 11.56, 1.19]
            }}>
                <Experience postId={params.postId} />
            </Canvas> */}

            <article className="w-screen align-bottom text-center mt-24">
                <Ad />
                <section className="w-screen flex justify-around mt-20">
                    <div className="basis-3/6">
                        <Posts postId={params.postId} />
                        <Comments postId={params.postId} />
                    </div>
                    <div className="basis-2/6">
                        <Sidearea />
                    </div>
                </section>
            </article>
        </main>
    )
}