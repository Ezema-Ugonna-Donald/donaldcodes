"use client"
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import Experience from "./Components/Home/Experience/experience";

export default function Home() {
  return (
    <main className="h-[100vh] w-[100vw]">
      <Canvas camera={{
        fov: 14,
        position: [1.19, 11.56, 1.19]
      }}>
        <Experience />
      </Canvas>
      
    </main>
  );
}
