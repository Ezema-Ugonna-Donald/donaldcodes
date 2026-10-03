// "use client"
import { Scroll } from "@react-three/drei";
import Ad from "@/app/(main)/components/home/experience/landing/ad";
import Posts from "@/app/(main)/components/home/experience/landing/posts";
import SideArea from "@/app/(main)/components/home/experience/landing/sidearea";
import TextType from '@/app/(main)/components/home/experience/landing/banner/textType';

export default function Landing () {
    return (
        <Scroll html>
          <article className="w-screen align-bottom text-center mt-96">
            <section className="">
              <div className="w-full text-center font-[Montserrat-Bold] text-white">
                    {/* <span className="text-3xl 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl uppercase drop-shadow-xl text-wrap">Welcome to my world of tech</span> */}
                <TextType 
                    text={["Welcome to my world of tech"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    />
                  <p className="text-white font-[Montserrat-Bold] sm:text-wrap sm:px-4">Join me as we travel across the techverse.</p>
                </div>
            </section>

            <Ad />
            <section className="w-screen 2xl:flex xl:flex lg:flex md:flex justify-around mt-20">
              <div className="2xl:basis-3/6 xl:basis-3/6 lg:basis-3/6 md:basis-3/6 sm:mx-11">
                <Posts />
              </div>
              <div className="2xl:basis-2/6 xl:basis-2/6 lg:basis-2/6 md:basis-2/6 sm:mx-11">
                <SideArea />
              </div>
            </section>
        </article>
    </Scroll>
    )
}