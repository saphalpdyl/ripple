export type GameRoom = {
  roomId: string;
  initialDeck: Deck;
}

export type PlayerData = {
  connectionId: string;
  userId: string;
};

export type PlayerDeckData = Record<string, Deck>;
export type PlayerMiscData = Record<string, {
  selected?: string; // cardId
  score?: number;
}>

export type Deck = {
  deckId: string;
  cards: Card[];
};

export type Card = {
  cardId?: string;
  question: string;
  questionType?: "MCQ" | "WH";
  options?: {
    Id: number;
    value: string;
  }[];
  answer?: {
    Id: number;
    value: string;
  }
};

export type FirestoreAuthUserData = {
  __auth_uid: string;
  role: "admin" | "user";
  username: string;
  id: string;
}