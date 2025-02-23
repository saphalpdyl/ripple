import MapLoader from "@/components/three/map-loader";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function MapDisplayItem({
  path,
}: { path: string }) {
  return (
    <Canvas
      camera={{ position: [0, 7, 5] }}
    >
      <OrbitControls autoRotate autoRotateSpeed={0.3}/>
      <MapLoader path={path} />
    </Canvas>
  );
}