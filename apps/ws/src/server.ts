import type * as Party from "partykit/server";
import BasePartyServer from "./core/server-base";
import { v4 as uuidv4 } from "uuid";

import type { PlayerData } from "@repo/types";
import { mockShuffleData } from "./mock-data";
import { WebSocketEvents } from "@repo/common/constants";

export default class Server extends BasePartyServer implements Party.Server {
  private users = new Map<string, PlayerData>();

  constructor(readonly room: Party.Room) {
    super(room);

    this.on(WebSocketEvents.GAME_START, () => {
      // Create a copy of the full deck
      const deck = [...mockShuffleData.questions.questions];
      
      // Calculate how many cards each player should get
      const playerCount = this.users.size;
      const cardsPerPlayer = Math.floor((deck.length * 0.8) / playerCount);
      
      // Distribute equal number of unique cards to each player
      for (const [_, player] of this.users.entries()) {
        // Take cardsPerPlayer number of cards from the start of the deck
        const playerDeck = deck.splice(0, cardsPerPlayer);
        player.deck.cards = playerDeck;
      }
    });
  }
  
  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext): void | Promise<void> {
    this.users.set(connection.id, {
      connectionId: connection.id,
      deck: {
        deckId: "",
        cards: [],
      },
      userId: "test-user-id",
    } satisfies PlayerData);
  }
}