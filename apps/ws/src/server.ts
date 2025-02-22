import type * as Party from "partykit/server";
import BasePartyServer from "./core/server-base";
import { v4 as uuidv4 } from "uuid";

import type { ClientPlayerData, PlayerData, PlayerDeckData, PlayerMiscData } from "@repo/types";
import { mockShuffleData } from "./mock-data";
import { WebSocketEvents } from "@repo/common/constants";

export default class Server extends BasePartyServer implements Party.Server {
  private users = new Map<string, PlayerData>();
  private userDecks: PlayerDeckData = {};
  private userMiscData: PlayerMiscData = {};
  
  private adminUserConnectionId: string | null = null;

  private sendUpdatedPlayerData() {
    // Compile different data into one client player data object
    // Loop through all connections ids and create a new object
    const finalPayload: Record<string, ClientPlayerData> = {};
    
    for ( const [connectionId, playerData] of this.users.entries() ) {
      const deck = this.userDecks[connectionId];
      const misc = this.userMiscData[connectionId];

      finalPayload[connectionId] = {
        ...playerData,
        deck,
        misc,
      };
    }

    this.emitAll(WebSocketEvents.PLAYER_UPDATE, {
      players: finalPayload,
    });
  }
  
  constructor(readonly room: Party.Room) {
    super(room);

    this.on(WebSocketEvents.GAME_START, () => {
      // Create a copy of the full deck
      const deck = mockShuffleData.questions.questions.map((question, index) => ({
        ...question,
        cardId: uuidv4(),
      }));
      
      // Calculate how many cards each player should get
      const playerCount = this.users.size;
      const cardsPerPlayer = Math.floor((deck.length * 0.6) / playerCount);
      
      // Distribute equal number of unique cards to each player
      for (const [_, player] of this.users.entries()) {
        // Take cardsPerPlayer number of cards from the start of the deck
        const playerDeck = deck.splice(0, cardsPerPlayer);

        this.userDecks[player.connectionId] = {
          deckId: uuidv4(),
          cards: playerDeck,
        };
      }

      this.sendUpdatedPlayerData();
    });
  }
  
  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext): void | Promise<void> {
    if ( !this.adminUserConnectionId ) {
      this.adminUserConnectionId = connection.id;
    }

    this.users.set(connection.id, {
      connectionId: connection.id,
      userId: "test-user-id",
    } satisfies PlayerData);
  }

  onClose(connection: Party.Connection): void | Promise<void> {
    this.emitWithout(WebSocketEvents.USER_LEFT, {
      userId: connection.id,
    }, [connection.id]);
    
    this.users.delete(connection.id);
    delete this.userDecks[connection.id];
    delete this.userMiscData[connection.id];

    if ( this.adminUserConnectionId === connection.id ) {
      this.adminUserConnectionId = this.users.keys().next().value || null;
    }
  }
}