import Card from "@/components/three/card";

export default function ShuffleDeck({
  cardStackNumber,
}: {
  cardStackNumber: number;
}) {
  return (
    <group>
      {
        Array.from({ length: cardStackNumber }).map((_, i) => {
          const position = [0,0.02 * i,0];
          return <Card me={false} position={position as [number, number, number]} rotation={[-Math.PI / 2,0,Math.random() * (Math.PI / 12)]}  />
        })
      }
    </group>
  );
}