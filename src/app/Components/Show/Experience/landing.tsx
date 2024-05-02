import { Scroll } from "@react-three/drei";
import Ad from "./Landing/ad";
import Posts from "./Landing/posts";
import Sidearea from "./Landing/sidearea";

export default function Landing (props: {postId: string}) {
    return (
        <Scroll html>
        <article className="w-screen align-bottom text-center mt-24">
            <Ad />
            <section className="w-screen flex justify-around mt-20">
              <div className="basis-3/6">
                <Posts postId={props.postId} />
              </div>
              <div className="basis-2/6">
                <Sidearea />
              </div>
            </section>
        </article>
    </Scroll>
    )
}