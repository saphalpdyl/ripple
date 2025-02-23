"use client";

import { Grid, MapControls, OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Deck from "@/components/three/deck";
import ShuffleDeck from "@/components/three/shuffle_deck";
import { useRoomStore } from "@/store/players";
import { ClientPlayerData, PlayerData } from "@repo/types";
import useGlobalStore from "@/store/global";
import { Suspense } from "react";
import Ground from "@/components/three/ground";

const PLAYER_POSITION_INDEX_TO_LOC_ROT = {
  0: {
    position: [0, 0, 3],
    rotation: [Math.PI * 1.8, 0, 0],
  },
  2: {
    position: [0, 0, -3],
    rotation: [0, -Math.PI, 0],
  },
}

export default function Game() {
  const { roomState, players, remainingCards } = useRoomStore();
  const { socket } = useGlobalStore();
  
  const otherPlayer = Object.values(players).filter((player: ClientPlayerData) => player.connectionId !== socket?.id)[0];
  const thisPlayer = Object.values(players).filter((player: ClientPlayerData) => player.connectionId === socket?.id)[0];

  return <Canvas className="h-full w-full">

    {
      roomState === "PLAYING" && (
        <>
          <Deck position={PLAYER_POSITION_INDEX_TO_LOC_ROT[0].position as [number, number, number]} rotation={PLAYER_POSITION_INDEX_TO_LOC_ROT[0].rotation as [number, number, number]}   me player={thisPlayer!}/>
          <Deck position={PLAYER_POSITION_INDEX_TO_LOC_ROT[2].position as [number, number, number]} rotation={PLAYER_POSITION_INDEX_TO_LOC_ROT[2].rotation as [number, number, number]}   player={otherPlayer!} />
        </>
      )
    }

    <ShuffleDeck cards={remainingCards}/>

    <PerspectiveCamera makeDefault position={[0, 3, 4]} fov={85}/>

    <Suspense fallback={null}>
      <Ground />
    </Suspense>

    <ambientLight intensity={1}/>
    <hemisphereLight intensity={0.35}/>
    <pointLight position={[0,4,0]} intensity={30}/>
    <OrbitControls/>
  </Canvas>
}   