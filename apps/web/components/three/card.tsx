import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import useGlobalStore from '@/store/global';
import { useRoomStore } from '@/store/players';
import toast from 'react-hot-toast';

export default function Card({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  me,
  onClick,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  me: boolean;
  onClick?: () => void;
}) {
  const { socket } = useGlobalStore();
  const { turn } = useRoomStore();
  const [ hovering, setHovering ] = useState(false);
  
  // Load the GLB model
  const { nodes, materials} = useGLTF('/card_normal.glb');
  const meshRef = useRef<THREE.Mesh>(null);
  
  const onPointerHover = (e: any) => {
    e.stopPropagation();
    setHovering(true);
  };
  
  const onPointerOut = () => setHovering(false);
  
  useFrame((_, delta) => {
    if (!meshRef.current || !me) return;
    
    const currentPos = meshRef.current.position;
    const targetPos = hovering 
      ? new THREE.Vector3(position[0], position[1] + 0.5, position[2])
      : new THREE.Vector3(...position);
    
    // Smoothly interpolate to target position
    currentPos.lerp(targetPos, delta * 10);
  });

  
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();

        if ( !me || !socket || turn !== socket.id ) {
          toast.error("Hold on! It's not your turn yet.")
          return;
        }
        if ( onClick ) onClick();
      }}
      ref={meshRef}
      onPointerOver={onPointerHover}
      onPointerOut={onPointerOut}
      position={position}
      rotation={rotation}
      scale={[1,1,1]}
    >
      {/* Assuming the model's main mesh is called 'Card' - adjust according to your GLB structure */}
      {/* <primitive object={obj.scene} /> */}
      <mesh 
        geometry={nodes.Card.geometry}
        material={materials.Card}
      />
    </group>
  );
}

// Preload the model
useGLTF.preload('/card_normal.glb');