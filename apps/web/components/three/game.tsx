"use client";

import { Grid, MapControls, OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Deck from "@/components/three/deck";
import ShuffleDeck from "@/components/three/shuffle_deck";
import { useRoomStore } from "@/store/players";
import { PlayerData } from "@repo/types";
import useGlobalStore from "@/store/global";

function getCircularOrder(players: PlayerData[], currentId: string): (PlayerData | null)[] {
  // Validate input
  if (!players.length || !players.some(p => p.connectionId === currentId)) {
    throw new Error('Invalid input: current ID must exist in players');
  }

  const playerCount = 4;
  const result: (PlayerData | null)[] = [];
  
  // Find the starting index (position after currentId)
  const startIdx = players.findIndex(p => p.connectionId === currentId);
  
  // Calculate how many positions we need to fill
  const positionsToFill = playerCount - 1; // Excluding the current position
  
  // Fill the positions after currentId
  for (let i = 0; i < positionsToFill; i++) {
    const nextIdx = (startIdx + 1 + i) % players.length;
    result.push(players[nextIdx] || null);
  }
  
  // Fill remaining positions with null if we don't have enough participants
  while (result.length < positionsToFill) {
    result.push(null);
  }
  
  return result;
}


export default function Game() {
  const { roomState, players } = useRoomStore();
  const { socket } = useGlobalStore();
  
  if ( roomState === "PLAYING" ) {
    console.log(getCircularOrder(Object.values(players), socket!.id));
  }
  
  return <Canvas className="h-full w-full">

    {/* {
      roomState === "PLAYING" && (
        <>
          <Deck numberOfCards={5} position={[0, 0, -3]} rotation={[0, -Math.PI, 0]}/>
          <Deck numberOfCards={5} position={[3.5, 0, 0]} rotation={[0, Math.PI * 0.5, 0]}/>
          <Deck numberOfCards={5} position={[0, 0, 3]} rotation={[Math.PI * 1.8, 0, 0]} me/>
          <Deck numberOfCards={5} position={[-3.5, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}/>
        </>
      )
    } */}

    <ShuffleDeck cardStackNumber={10}/>

    <PerspectiveCamera makeDefault position={[0, 3, 4]} fov={85}/>

    <ambientLight intensity={3}/>
    <OrbitControls/>
  </Canvas>
}   