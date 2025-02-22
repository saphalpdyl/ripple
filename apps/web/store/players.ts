import { PlayerData, PlayerDeckData, PlayerMiscData } from "@repo/types";
import { create } from "zustand";

interface PlayerStore {
  players: Record<string, PlayerData>;
  setPlayers: (players: Record<string, PlayerData>) => void;
}

export const usePlayersStore = create<PlayerStore>((set) => ({
  players: {},
  setPlayers: (players: Record<string, PlayerData>) => set({ players }),
}));