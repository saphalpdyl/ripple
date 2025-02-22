import useGlobalStore from "@/store/global";
import { usePlayersStore } from "@/store/players";
import { WebSocketEvents } from "@repo/common/constants";
import { PlayerData } from "@repo/types";
import { useEffect } from "react";

export default function CardInitialize({
  children,
}: { children: React.ReactNode}) {

  const { socket } = useGlobalStore();
  const { setPlayers } = usePlayersStore();
  useEffect(() => {
    if ( !socket ) return;

    socket.on(WebSocketEvents.USER_LEFT, ({ userId }) => {
      
    })
    
    socket.on(WebSocketEvents.PLAYER_UPDATE, data => {
      
    });

  }, [socket]);
  
  return children;
}