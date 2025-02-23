"use client";

import { Grid, Html, MapControls, OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Deck from "@/components/three/deck";
import ShuffleDeck from "@/components/three/shuffle_deck";
import { useRoomStore } from "@/store/players";
import { ClientPlayerData, PlayerData } from "@repo/types";
import useGlobalStore from "@/store/global";
import { Suspense, useEffect } from "react";
import Ground from "@/components/three/ground";
import { CartoonEffect } from "@/components/three/cartoon-effect";

import { useSpring, animated } from "@react-spring/three"

const AnimatedCamera = animated(PerspectiveCamera);

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

  // const { position, rotation} = useSpring({
  //   from: {
  //     position: [0, 100, 0],
  //     rotation: [Math.PI/2, 0 , 0],
  //     fov: 100,
  //   },
  //   to: {
  //     position: [0, 3, 4],
  //     rotation: [-Math.PI/4, 0, 0],
  //     fov: 85,
  //   },
  //   config: {
  //     mass: 1,
  //     tension: 100,
  //     friction: 40,
  //   }
  // });

  const [data, api] = useSpring(() => ({
    position: [0, 100, 0],
    rotation: [Math.PI/2, 0 , 0],
    fov: 100,
    config: {
      mass: 2,
      tension: 70,
    }
  }));

  useEffect(() => {
    if ( roomState === "PLAYING" ) {
      api.start({
        position: [0, 3, 4],
        rotation: [-Math.PI/4, 0, 0],
        fov: 85,
      });
    }

    if ( roomState === "END" ) {
      api.start({
        position: [6, 2, 4],
        rotation: [-Math.PI / 1.2, Math.PI / 1.4 , Math.PI / 1.1],
        fov: 100,
      });
    }
  }, [roomState]);

  return <>
    {
      thisPlayer && (
        <div className="absolute z-[90] left-1/2 -translate-x-1/2 top-2 flex items-center justify-center gap-3 border p-3 rounded-lg text-gray-700">
          <div className="w-5 h-5 rounded-full bg-green-400 ring-2 ring-green-600 ring-offset-1"></div>
          <span>You are playing as { thisPlayer?.username } </span>
        </div>
      )
    }
    <Canvas className="h-full w-full">

      {
        roomState === "PLAYING" && (
          <>
            <Deck position={PLAYER_POSITION_INDEX_TO_LOC_ROT[0].position as [number, number, number]} rotation={PLAYER_POSITION_INDEX_TO_LOC_ROT[0].rotation as [number, number, number]}   me player={thisPlayer!}/>
            <Deck position={PLAYER_POSITION_INDEX_TO_LOC_ROT[2].position as [number, number, number]} rotation={PLAYER_POSITION_INDEX_TO_LOC_ROT[2].rotation as [number, number, number]}   player={otherPlayer!} />
            <Html position={[PLAYER_POSITION_INDEX_TO_LOC_ROT[2].position[0], PLAYER_POSITION_INDEX_TO_LOC_ROT[2].position[1] + 2, PLAYER_POSITION_INDEX_TO_LOC_ROT[2].position[2]]}>
              <div className="absolute z-[90] left-1/2 -translate-x-1/2 top-1/2 flex items-center justify-center gap-3 rounded-lg text-gray-300 font-bold text-7xl">
                <span>{ otherPlayer?.username }</span>
              </div>
            </Html>
          </>
        )
      }


      <ShuffleDeck cards={remainingCards}/>

      {/* <PerspectiveCamera makeDefault position={[0, 3, 4]} fov={85}/> */}
      <AnimatedCamera makeDefault position={data.position} rotation={data.rotation} fov={85}/>

      <Suspense fallback={null}>
        <Ground />
      </Suspense>

      <ambientLight intensity={1} castShadow/>
      <hemisphereLight 
        intensity={0.35}
        castShadow
      />
      <pointLight 
        position={[0,4,0]} 
        intensity={30}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.001}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
      />
      {/* <OrbitControls/> */}
    </Canvas>
  </>
}   