import { Card, ClientPlayerData, PlayerData, PlayerDeckData, PlayerMiscData } from "@repo/types";
import { create } from "zustand";

interface RoomState {
  players: Record<string, ClientPlayerData>;
  setPlayers: (players: Record<string, ClientPlayerData>) => void;

  roomState: "WAITING_FOR_PLAYERS" | "PLAYING" | "END";
  remainingCards: Card[];
  userMaxIndex: number;
  adminUserConnectionId: string | null;
  turn: string;

  selectedQuestion: Card & { player: PlayerData; } | null;
  setSelectedQuestion: (question: Card & { player: PlayerData; }) => void;
  selectedAnswer: {
    question: Card;
    answerId?: number; // Either answerId or answerWH
    answerWH?: string;
    player: PlayerData;
  } | null,
  setSelectedAnswer: (answer: {
    player: PlayerData;
    question: Card;
    answerId?: number;
    answerWH?: string;
  }) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  players: {},
  setPlayers: (players: Record<string, ClientPlayerData>) => set({ players }),

  roomState: "WAITING_FOR_PLAYERS",
  remainingCards: [],
  userMaxIndex: 0,
  adminUserConnectionId: null,
  turn: "",

  selectedQuestion: null,
  setSelectedQuestion: (question) => set({ selectedQuestion: question }),
  selectedAnswer: null,
  setSelectedAnswer: (answer) => set({ selectedAnswer: answer }),

}));