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

  // Remove duplicates by connectionId
  const uniquePlayers = players.filter((player, index) => {
    return players.findIndex(p => p.connectionId === player.connectionId) === index;
  });

  const playerCount = 4; // Total positions in the game
  const result: (PlayerData | null)[] = [];
  
  // Find the current player's index
  const currentPlayerIndex = uniquePlayers.findIndex(p => p.connectionId === currentId);
  
  // Calculate positions needed after current player
  const positionsToFill = playerCount - 1; // Excluding current player's position
  
  // Fill positions after current player
  for (let i = 0; i < positionsToFill; i++) {
    const nextIndex = (currentPlayerIndex + 1 + i) % uniquePlayers.length;
    
    // Only add the player if they're different from the current player
    const nextPlayer = uniquePlayers[nextIndex];
    if (nextPlayer && nextPlayer.connectionId !== currentId) {
      result.push(nextPlayer);
    } else {
      result.push(null);
    }
  }
  
  // Ensure we have exactly positionsToFill elements
  while (result.length < positionsToFill) {
    result.push(null);
  }
  
  // Trim if we somehow got too many positions
  if (result.length > positionsToFill) {
    result.length = positionsToFill;
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