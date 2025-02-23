import { useMemo } from 'react';
import Card from "@/components/three/card";
import { ClientPlayerData } from '@repo/types';
import { useRoomStore } from '@/store/players';
import { WebSocketEvents } from '@repo/common/constants';
import useGlobalStore from '@/store/global';

export default function Deck({
  position,
  rotation,
  me = false,
  player,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  me?: boolean;
  player: ClientPlayerData,
}) {
  const { socket } = useGlobalStore();
  
  // Calculate card positions and rotations for a fan effect
  const cardProps = useMemo(() => {
    return player.deck?.cards.map((card, i) => {
      // Calculate the angle for the fan spread (60 degrees total spread)
      const fanAngle = (90 / player.deck!.cards.length) * i - 45;
      
      // Convert angle to radians
      const angleRad = (fanAngle * Math.PI) / 180;
      
      // Calculate position offset for fan effect
      const xOffset = Math.sin(angleRad) * 2;
      const zOffset = Math.cos(angleRad) * 0.5;
      
      return {
        position: [xOffset, 0, i * 0.001 + zOffset] as [number, number, number],
        rotation: [0, -angleRad, 0] as [number, number, number],
        card,
      };
    });
  }, [player.deck?.cards.length]);

  return (
    <group position={position} rotation={rotation}>
      {cardProps?.map((props, i) => (
        <Card
          // onPointerHover={() => console.log('hover')}
          // onPointerOut={() => console.log('unhover')}
          key={i}
          position={props.position}
          rotation={props.rotation}
          me={me}

          onClick={() => {
            if ( !socket ) return;

            socket.emit(WebSocketEvents.PLAYER_QUESTION_SELECT, {
              question: props.card,
              playerId: socket.id,
            });
          }}
        />
      ))}
    </group>
  );
}