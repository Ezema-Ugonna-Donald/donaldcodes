"use client"
import { OrbitControls, ScrollControls, Stars } from "@react-three/drei";
import { Planet } from "@/app/planet";
import Landing from "@/app/(main)/components/home/experience/landing";

export default function Experience () {
    return (
        <>
            <ambientLight intensity={5} />
            {/* <OrbitControls enabled={false} enableZoom={false} enableRotate={false} /> */}
            <Stars />
            <ScrollControls enabled={true} pages={7.5} damping={0.25}>
                <Landing />
                <Planet  />
            </ScrollControls>
        </>
    )
}