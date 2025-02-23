import useGlobalStore from "@/store/global";
import Socket from "@/firebase/core/socket";
import { useEffect } from "react";

import { PARTYKIT_HOST } from "@/env"
import { useAuthStore } from "@/store/auth";
import { WebSocketEvents } from "../../../../packages/common/constants";

interface SocketConnectionProps {
  children: React.ReactNode;
  room: string;
}

export default function SocketConnection({ children, room } : SocketConnectionProps) {
  const { setSocket, addSocketConnectCallbacks } = useGlobalStore();
  const { auth } = useAuthStore();

  useEffect(() => {
    if ( !auth || auth.status !== "auth" ) return;
    
    setSocket(new Socket({
      host: PARTYKIT_HOST,
      room,
      query: {
        test: "hello"
      }
    }));

    addSocketConnectCallbacks(async socket => {
      // "Connect" with the socket
      socket.emit(WebSocketEvents.USER_CONNECT, {
        auth_uid: auth.user!.uid,
        username: auth.user!.displayName,
        photoURL: auth.user!.photoURL,
      });
    });
  }, [addSocketConnectCallbacks, auth, room, setSocket]);

  return children;
}