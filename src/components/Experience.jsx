import { OrbitControls, ScrollControls, Stars } from '@react-three/drei'
import React, { useEffect } from 'react'
import { Planet } from './Planet'
import { useThree } from '@react-three/fiber'
import Landing from './Landing'

const Experience = () => {
    // const {
    //     camera, gl:{domElement},
    // } = useThree()

    // useEffect(() => {
    //     const fetchData = () => {
    //         setInterval(console.log(camera.position), 1000)
    //     }

    //     fetchData()
    // }, [])

  return (
    <>
        <ambientLight intensity={5} />
        <OrbitControls enableZoom={false} />
        <Stars />
        <ScrollControls pages={7.5} damping={0.25}>
            <Landing />
            <Planet />
        </ScrollControls>
    </>
  )
}

export default Experience