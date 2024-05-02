"use client"
import { OrbitControls, ScrollControls, Stars } from "@react-three/drei";
import { Planet } from "../../../planet";
import Landing from "./landing";

export default function Experience () {
    return (
        <>
            <ambientLight intensity={5} />
            <OrbitControls enableZoom={false} />
            <Stars />
            <ScrollControls pages={7.5} damping={0.25}>
                <Landing />
                <Planet  />
            </ScrollControls>
        </>
    )
}