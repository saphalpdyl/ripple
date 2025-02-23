import useGlobalStore from "@/store/global";
import { useRoomStore } from "@/store/players";
import { WebSocketEvents } from "@repo/common/constants";
import { PlayerData } from "@repo/types";
import { useEffect } from "react";

export default function CardInitialize({
  children,
}: { children: React.ReactNode}) {

  const { socket } = useGlobalStore();
  const { setPlayers } = useRoomStore();

  useEffect(() => {
    if ( !socket ) return;

    socket.on(WebSocketEvents.USER_LEFT, ({ userId }) => {
      
    })
    
    socket.on(WebSocketEvents.PLAYER_UPDATE, ({ players }) => {
      setPlayers(players);
    });

    socket.on(WebSocketEvents.GAME_STATE, ({
      gameState,
      remainingCards,
      admin,
    }) => {
      useRoomStore.setState({
        roomState: gameState,
        remainingCards,
        adminUserConnectionId: admin,
      });
    })

  }, [socket]);
  
  return children;
}