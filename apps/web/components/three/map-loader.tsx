import { Stage, useGLTF } from "@react-three/drei";

export default function MapLoader({
  path,
} : {
  path: string,
}) {
  const scene = useGLTF(path);
  return <Stage>
    <group scale={[1.4,1.4,1.4]}>
      <primitive object={scene.scene} />
    </group>
  </Stage>
}