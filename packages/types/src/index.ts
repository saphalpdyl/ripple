export type GameRoom = {
  roomId: string;
  initialDeck: Deck;
}

export type PlayerData = {
  connectionId: string;
  userId: string;
  deck: Deck;
};

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