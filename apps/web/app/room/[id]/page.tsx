"use client";

import ConnectSocket from "@/components/initializers/socket-connect";
import SocketConnection from "@/components/initializers/socket-init";
import Game from "@/components/three/game";
import { useParams } from "next/navigation";

export default function Room() {
  const { id } = useParams();

  return <div className="h-screen w-screen">
    <SocketConnection room={id as string || ""}>
      <ConnectSocket>
        <Game />
      </ConnectSocket>
    </SocketConnection>
  </div>
}