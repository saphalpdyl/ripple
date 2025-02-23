import useGlobalStore from "@/store/global";
import { useRoomStore } from "@/store/players";
import { WebSocketEvents } from "@repo/common/constants";
import { PlayerData } from "@repo/types";
import { useEffect } from "react";

export default function CardInitialize({
  children,
}: { children: React.ReactNode}) {

  const { socket } = useGlobalStore();
  const { setPlayers, selectedQuestion,  } = useRoomStore();

  useEffect(() => {
    if ( !socket ) return;

    if ( !socket.isRegistered(WebSocketEvents.USER_LEFT))
      socket.on(WebSocketEvents.USER_LEFT, ({ userId }) => {
        const prevPlayers = useRoomStore.getState().players;
        const newPlayers = { ...prevPlayers };
        delete newPlayers[userId];
        setPlayers(newPlayers);
      })
    
    
    if ( !socket.isRegistered(WebSocketEvents.PLAYER_UPDATE))
      socket.on(WebSocketEvents.PLAYER_UPDATE, ({ players }) => {
        setPlayers(players);
      });

    if ( !socket.isRegistered(WebSocketEvents.GAME_STATE))
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
      });


    if ( !socket.isRegistered(WebSocketEvents.PLAYER_QUESTION_SELECT))
      socket.on(WebSocketEvents.PLAYER_QUESTION_SELECT, ({ question, player }) => {
        question.player = player;
        
        useRoomStore.setState({
          selectedQuestion: question,
        });
      });


  }, [socket]);
  
  return children;
}