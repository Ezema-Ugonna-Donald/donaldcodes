"use client"
import { OrbitControls, ScrollControls, Stars } from "@react-three/drei";
import Landing from "./landing";
// import { Planet } from "@/app/show/planet";

export default function Experience (props: {postId: string}) {
    return (
        <>
            <ambientLight intensity={5} />
            <OrbitControls enableZoom={false} />
            <Stars />
            <ScrollControls pages={20} damping={0.25}>
                <Landing postId={props.postId} />
                {/* <Planet  /> */}
            </ScrollControls>
        </>
    )
}