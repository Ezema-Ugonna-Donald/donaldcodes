import Ad from "@/app/Components/Home/Experience/Landing/ad";
import Sidearea from "@/app/Components/Home/Experience/Landing/sidearea";
import Posts from "@/app/Components/Search/posts";

export default function PostsBySearch({params}: {
    params: { searchField: string }
}) {
    return (
        <main className="bg-black">
            <article className="w-screen align-bottom text-center mt-24">
                <Ad />
                <section className="w-screen flex justify-around mt-20">
                <div className="basis-3/6">
                    <Posts searchField={params.searchField} />
                </div>
                <div className="basis-2/6">
                    <Sidearea />
                </div>
                </section>
            </article>
        </main>
    )
}