import Posts from "@/app/Components/category/posts"
import Ad from "@/app/Components/Home/Experience/Landing/ad"
import Sidearea from "@/app/components/home/experience/landing/sidearea"

export default function PostsByCategories({params}: {
    params: { categoryname: string }
}) {
    return (
        <main className="bg-black">
            <article className="w-screen align-bottom text-center mt-24">
                <Ad />
                <section className="w-screen flex justify-around mt-20">
                <div className="basis-3/6">
                    <Posts categoryname={params.categoryname} />
                </div>
                <div className="basis-2/6">
                    <Sidearea />
                </div>
                </section>
            </article>
        </main>
    )
}