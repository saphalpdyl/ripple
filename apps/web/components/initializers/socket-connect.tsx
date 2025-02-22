import useGlobalStore from "@/store/global";
import { useEffect } from "react";
import Loader from "@/components/loader";

// This component must be inside the SocketConnection component
export default function ConnectSocket({
  children
}: {
  children: React.ReactNode;
}) {
  const { socket, socketConnectCallbacks } = useGlobalStore();

  useEffect(() => {
    // if(!socket) return console.error("Socket is not initialized");
    if ( !socket ) return;
    
    socket.connect();

    const callbacks = socketConnectCallbacks.map(cb => cb(socket));
    Promise.all(callbacks).then(async () => {
      // No socket connection call backs for now
    });
  }, [socket, socketConnectCallbacks]);

  if (!socket) return <Loader title="Socket Loading..." subtitle="The server is configuring socket connections." progress={60} />
  
  return children;
}

