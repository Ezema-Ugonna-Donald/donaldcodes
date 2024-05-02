"use client"
import Ad from "@/app/Components/Show/Experience/Landing/ad"
import Posts from "@/app/Components/Show/Experience/Landing/posts"
import Sidearea from "@/app/Components/Home/Experience/Landing/sidearea"
import Experience from "@/app/Components/Show/Experience/experience"
import { Canvas } from "@react-three/fiber"
import Comments from "@/app/Components/Show/Comments"

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