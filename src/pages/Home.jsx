import React from 'react'
import { Canvas, useThree } from "@react-three/fiber"
import Experience from "./../components/Experience"
import Landing from '../components/Landing'

const Home = () => {
  return (
    <>
        {/* <Landing /> */}
        <Canvas camera={{
        fov: 14,
        position: [1.19, 11.56, 1.19]
      }}>
        <Experience />
      </Canvas>
    </>
  )
}

export default Home