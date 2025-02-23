import { Card, ClientPlayerData, PlayerData, PlayerDeckData, PlayerMiscData } from "@repo/types";
import { create } from "zustand";

interface RoomState {
  players: Record<string, ClientPlayerData>;
  setPlayers: (players: Record<string, ClientPlayerData>) => void;

  roomState: "WAITING_FOR_PLAYERS" | "PLAYING" | "END";
  remainingCards: Card[];
  userMaxIndex: number;
  adminUserConnectionId: string | null;
}

export const useRoomStore = create<RoomState>((set) => ({
  players: {},
  setPlayers: (players: Record<string, ClientPlayerData>) => set({ players }),

  roomState: "WAITING_FOR_PLAYERS",
  remainingCards: [],
  userMaxIndex: 0,
  adminUserConnectionId: null,
}));