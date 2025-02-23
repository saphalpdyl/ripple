"use client";

import CardInitialize from "@/components/initializers/card-initialize";
import ConnectSocket from "@/components/initializers/socket-connect";
import SocketConnection from "@/components/initializers/socket-init";
import Question from "@/components/question";
import Game from "@/components/three/game";
import useGlobalStore from "@/store/global";
import { useRoomStore } from "@/store/players";
import { WebSocketEvents } from "@repo/common/constants";
import { useParams } from "next/navigation";

export default function Room() {
  const { id } = useParams();
  const { socket } = useGlobalStore();
  const { players, adminUserConnectionId, selectedQuestion } = useRoomStore();

  return <div className="h-screen w-screen">
    <SocketConnection room={id as string || ""}>
      <CardInitialize>
        <ConnectSocket>
          {
            ((Object.keys(players).length) >= 2) && (socket!.id === adminUserConnectionId) && (
              <div 
                onClick={() => {
                  socket!.emit(WebSocketEvents.GAME_START, {});
                }}
                className="absolute h-12 w-36 top-12 left-3 border rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 z-[90]">
                  Get ready
              </div>
            )
          }
            <div 
              onClick={() => {
                socket!.emit(WebSocketEvents.GAME_END, {});
              }}
              className="absolute h-12 w-36 top-36 left-3 border rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 z-[90]">
                End game
            </div>

            <div>
              {
                selectedQuestion && (
                  <div className="absolute top-1/2 -translate-y-[70%] left-4 z-[90] max-w-96">
                    <Question question={selectedQuestion} />
                  </div>
                )
              }
            </div>
          <Game />
        </ConnectSocket>
      </CardInitialize>
    </SocketConnection>
  </div>
}