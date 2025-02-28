import type * as Party from "partykit/server";
import BasePartyServer from "./core/server-base";
import { v4 as uuidv4 } from "uuid";

import type { Card, ClientPlayerData, PlayerData, PlayerDeckData, PlayerMiscData } from "@repo/types";
import { mockShuffleData } from "./mock-data";
import { WebSocketEvents } from "@repo/common/constants";
import { convertToTypedDeck } from "./utils";

export default class Server extends BasePartyServer implements Party.Server {
  private users = new Map<string, PlayerData>();
  private userDecks: PlayerDeckData = {};
  private userMiscData: PlayerMiscData = {};
  private userMaxIndex = 0;
  private remainingCards: Card[] = [];
  private gameState: "WAITING_FOR_PLAYERS" | "PLAYING" | "END" = "WAITING_FOR_PLAYERS";
  private turn: string | null = null;
  
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

    this.emitAll(WebSocketEvents.GAME_STATE, {
      gameState: this.gameState,
      remainingCards: this.remainingCards,
      admin: this.adminUserConnectionId,
      turn: this.turn,
    });
  }
  
  private flipTurn() {
    const anotherTurnPlayerId = Array.from(this.users.keys()).find((id) => id !== this.turn);
    if ( anotherTurnPlayerId ) {
      this.turn = anotherTurnPlayerId;
    }
  }
  
  private startGame() {
    // Create a copy of the full deck
    const deck = convertToTypedDeck(mockShuffleData);
      
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

    this.remainingCards = deck;
    this.gameState = "PLAYING";

    // Randomly select either one of the players to start the game
    const playerIds = Array.from(this.users.keys());
    this.turn = playerIds[Math.floor(Math.random() * playerIds.length)];
    
    this.sendUpdatedPlayerData();
  }
  
  constructor(readonly room: Party.Room) {
    super(room);

    this.on(WebSocketEvents.GAME_START, this.startGame);

  this.on(WebSocketEvents.PLAYER_QUESTION_SELECT, ({ question, playerId }) => {
    if ( this.gameState !== "PLAYING" ) return;
    if ( this.userMiscData[playerId]?.selected ) return;

    const player = this.users.get(playerId);
    if ( !player ) return;

    this.emitAll(WebSocketEvents.PLAYER_QUESTION_SELECT, {
      question,
      player,
    });
  });

  this.on(WebSocketEvents.PLAYER_QUESTION_ANSWER, ({ question, playerId, isCorrect }) => {
    if ( this.gameState !== "PLAYING" ) return;

    // Remove the question from the player's deck
    const playerDeck = this.userDecks[playerId];
    if ( !playerDeck ) return;

    if ( isCorrect ) {
      delete playerDeck[question.cardId];
    }
    
    this.flipTurn();
    this.sendUpdatedPlayerData();
  });    

    this.on(WebSocketEvents.GAME_END, () => {
      this.gameState = "END";
      this.sendUpdatedPlayerData();
    });

    this.on(WebSocketEvents.PLAYER_INFO_UPDATE, ({ playerInfo, connectionId }: {
      playerInfo: Partial<PlayerData>,
      connectionId: string,
    }) => {
      this.users.set(connectionId, {
        ...this.users.get(connectionId),
        ...playerInfo,
      } as PlayerData);

      this.sendUpdatedPlayerData();
    });
  }
  
  
  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext): void | Promise<void> {
    if ( this.gameState === "PLAYING" || Object.keys(this.users).length > 2 ) return connection.close();
    
    if ( !this.adminUserConnectionId ) {
      this.adminUserConnectionId = connection.id;
    }

    this.users.set(connection.id, {
      connectionId: connection.id,
      userId: "test-user-id",
      userIndex: this.userMaxIndex++,
      username: "",
    } satisfies PlayerData);
    
    if ( this.gameState === "WAITING_FOR_PLAYERS" && Object.keys(Object.fromEntries(this.users)).length >= 2 ) {
       this.startGame();
    }
    this.sendUpdatedPlayerData();
    
  }

  onClose(connection: Party.Connection): void | Promise<void> {
    if ( this.users.size === 1 ) {
      this.userMaxIndex = 0; // Reset the ordering index
    }
    
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