import { useGLTF } from "@react-three/drei";

export default function Ground() {
  const scene = useGLTF("/table_green_plains.glb");
  return <group scale={[1.4,1.4,1.4]} position={[0, -1.25, 0]} rotation={[0, Math.PI / 2, 0]}>
    <primitive object={scene.scene} />
  </group>;
}