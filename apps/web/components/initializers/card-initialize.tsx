import useGlobalStore from "@/store/global";
import { WebSocketEvents } from "@repo/common/constants";
import { useEffect } from "react";

export default function CardInitialize({
  children,
}: { children: React.ReactNode}) {

  const { socket } = useGlobalStore();

  useEffect(() => {
    if ( !socket ) return;

    socket.on(WebSocketEvents.CARD_UPDATE, data => {
      
    });

  }, [socket]);
  
  return children;
}