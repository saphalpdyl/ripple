"use client";

import { Grid, MapControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Deck from "@/components/three/deck";

export default function Game() {
  return <Canvas className="h-full w-full">

    <Deck numberOfCards={5} position={[0, 0, -3]} rotation={[0, -Math.PI, 0]}/>
    <Deck numberOfCards={5} position={[3.5, 0, 0]} rotation={[0, Math.PI * 0.5, 0]}/>
    <Deck numberOfCards={5} position={[0, 0, 3]} rotation={[Math.PI * 1.8, 0, 0]} me/>
    <Deck numberOfCards={5} position={[-3.5, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}/>

    <PerspectiveCamera makeDefault position={[0, 3, 4]} fov={85}/>

    <ambientLight intensity={3}/>
    <OrbitControls/>

  </Canvas>
}