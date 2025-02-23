import Card from "@/components/three/card";
import type { Card as CardType } from "@repo/types";

export default function ShuffleDeck({
  cards,
}: {
  cards: CardType[];
}) {
  if(!cards) return;
  
  return (
    <group>
      {
        Array.from({ length: cards.length }).map((_, i) => {
          const position = [0,0.02 * i,0];
          return <Card key={i} me={false} position={position as [number, number, number]} rotation={[-Math.PI / 2,0,Math.random() * (Math.PI / 12)]}  />
        })
      }
    </group>
  );
}