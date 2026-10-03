"use client"
import { OrbitControls, Scroll, ScrollControls, Stars } from "@react-three/drei";
import { Planet } from "@/app/planet";
import Landing from "@/app/(main)/components/home/experience/landing";

import dynamic from "next/dynamic";

const DynamicExperience = dynamic(
  () => Promise.resolve(Experience),
  {
    ssr: false,
    loading: () => <div>Loading 3D experience...</div>,
  }
);

export const ExperienceClient = () => {
  return <DynamicExperience />;
};

export default function Experience () {
    return (
        <>
            <ambientLight intensity={5} />
            {/* <OrbitControls enabled={false} enableZoom={false} enableRotate={false} /> */}
            <Stars />
            <ScrollControls enabled={true} pages={7.5} damping={0.25}>
                <Scroll>
                    <Planet  />
                </Scroll>
                <Scroll html>
                    <Landing />
                </Scroll>
            </ScrollControls>
        </>
    )
}