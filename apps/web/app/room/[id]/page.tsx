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

import { AnimatePresence, motion } from "motion/react";

export default function Room() {
  const { id } = useParams();
  const { socket } = useGlobalStore();
  const { players, adminUserConnectionId, selectedQuestion, roomState } = useRoomStore();

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

            <AnimatePresence>
              {roomState === "WAITING_FOR_PLAYERS" && (
                <motion.div 
                  className="absolute h-screen w-screen flex flex-col items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span 
                    className="font-vt font-bold text-5xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Ready to test yourself against others?
                  </motion.span>
                  
                  <motion.p 
                    className="text-gray-600 text-xl font-light"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Waiting for the other player to join...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>


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