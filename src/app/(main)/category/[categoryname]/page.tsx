import Posts from "@/app/(main)/components/category/posts"
import Ad from "@/app/(main)/components/home/experience/landing/ad"
import Sidearea from "@/app/(main)/components/home/experience/landing/sidearea"

export default function PostsByCategories({params}: {
    params: { categoryname: string }
}) {
    return (
        <main className="bg-black">
            <article className="w-screen align-bottom text-center mt-24">
                <Ad />
                <section className="w-screen 2xl:flex xl:flex lg:flex md:flex justify-around mt-20">
                <div className="basis-3/6 sm:mx-11">
                    <Posts categoryname={params.categoryname} />
                </div>
                <div className="basis-2/6 sm:mx-11">
                    <Sidearea />
                </div>
                </section>
            </article>
        </main>
    )
}