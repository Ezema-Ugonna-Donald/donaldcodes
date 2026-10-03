"use client"
import { Canvas } from "@react-three/fiber";
import ExperienceClient from "@/app/(main)/components/home/experience/experience";

export default function Home() {
  return (
    <main className="h-[100vh] w-[100vw]">
      <Canvas className="canvas" camera={{
        fov: 14,
        position: [1.19, 11.56, 1.19]
      }}>
        <ExperienceClient />
      </Canvas>
      
    </main>
  );
}
