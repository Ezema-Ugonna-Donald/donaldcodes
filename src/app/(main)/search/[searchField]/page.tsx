import Ad from "@/app/(main)/components/home/experience/landing/ad";
import Sidearea from "@/app/(main)/components/home/experience/landing/sidearea";
import Posts from "@/app/(main)/components/search/posts";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function PostsBySearch(
    props: {
        params: Promise<{ searchField: string }>
    }
) {
    const params = await props.params;
    return (
        <main className="bg-black">
            <article className="w-screen align-bottom text-center mt-24">
                <Ad />
                <section className="w-screen 2xl:flex xl:flex lg:flex md:flex justify-around mt-20">
                <div className="basis-3/6 sm:mx-11">
                    <Posts searchField={params.searchField} />
                </div>
                <div className="basis-2/6 sm:mx-11">
                    <Sidearea />
                </div>
                </section>
            </article>
        </main>
    )
}