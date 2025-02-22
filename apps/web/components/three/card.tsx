import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Card({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  me,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  me: boolean;
}) {
  const [ hovering, setHovering ] = useState(false);

  const meshRef = useRef<THREE.Mesh>(null);
  const targetPosition = useRef(new THREE.Vector3(...position));

  const onPointerHover = e => {
    e.stopPropagation();
    setHovering(true);
  };
  const onPointerOut = () => setHovering(false);
  
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if ( !me ) return;

    
    const currentPos = meshRef.current.position;
    const targetPos = hovering 
      ? new THREE.Vector3(position[0], position[1]  + 0.5, position[2])
      : new THREE.Vector3(...position);
    
    // Smoothly interpolate to target position
    currentPos.lerp(targetPos, delta * 10);
  });
  
  return (
    <mesh
      onClick={e => {
        e.stopPropagation();
        console.log('click');
      }}
      ref={meshRef}
      onPointerOver={onPointerHover}
      onPointerOut={onPointerOut}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <boxGeometry args={[1, 1.5, 0.05, 32]} />
      <meshStandardMaterial color="#ddd" />
    </mesh>
  );
}