import { Scroll } from "@react-three/drei";
import Ad from "./Landing/ad";
import Posts from "./Landing/posts";
import Sidearea from "./Landing/sidearea";

export default function Landing () {
    return (
        <Scroll html>
        <article className="w-screen align-bottom text-center mt-96">
            <section className="">
                <div className="w-full text-center font-[Montserrat-Bold] text-white">
                    <span className="text-5xl uppercase drop-shadow-xl text-wrap">Welcome to my world of tech</span>
                    <p className="text-white font-[Montserrat-Bold]">Join me as we travel across the techverse.</p>
                </div>
            </section>
            <Ad />
            <section className="w-screen flex justify-around mt-20">
              <div className="basis-3/6">
                <Posts />
              </div>
              <div className="basis-2/6">
                <Sidearea />
              </div>
            </section>
        </article>
    </Scroll>
    )
}