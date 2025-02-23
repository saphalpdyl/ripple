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
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { generateGamerUsername } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CopyToClipboard from "@/components/copy-to-clipboard";

export default function Room() {
  const { id } = useParams();
  const { socket, setSocket } = useGlobalStore();
  const { auth } = useAuthStore();
  const { players, adminUserConnectionId, selectedQuestion, roomState, turn } = useRoomStore();

  useEffect(() => {
    if ( !socket ) return;

    socket.emit(WebSocketEvents.PLAYER_INFO_UPDATE, {
      playerInfo: {
        userId: auth?.user?.uid,
        username: generateGamerUsername(),
      },
      connectionId: socket.id,
    })
  }, [socket]);

  return <div className="h-screen w-screen">
    <SocketConnection room={id as string || ""}>
      <CardInitialize>
        <ConnectSocket>
          
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

                  <hr />
                  <motion.div 
                    className="text-gray-600 text-xl font-light z-[90]"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <CopyToClipboard link={window.location.toString()} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>


            <div className="absolute top-10 left-2 z-[1200]">
              <Link 
              onClick={() => {
                setSocket(null);
              }}
              className="flex gap-2 items-center bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-white p-2 rounded-lg" href="/">
                <ArrowLeft />
                <span>Go back</span>
              </Link>
            </div>

            <div>
              {
                selectedQuestion && (
                  <div className="absolute top-1/2 -translate-y-[70%] left-4 z-[90] min-w-80 max-w-96">
                    <Question question={selectedQuestion} disabled={!(turn === socket!.id)}/>
                  </div>
                )
              }
            </div>
            <Game roomId={id as string}/>
        </ConnectSocket>
      </CardInitialize>
    </SocketConnection>
  </div>
}