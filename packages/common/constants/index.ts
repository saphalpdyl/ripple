export const WebSocketEvents = {
  // Room related
  EXISTING_USERS: "existing-users",

  // For self
  USER_CONNECT: "user-connect",
  USER_DISCONNECT: "user-disconnect",

  // For others
  USER_JOINED: "user-joined",
  USER_LEFT: "user-left",

  GAME_START: "game-start",
  GAME_END: "game-end",
  PLAYER_UPDATE: "player-update",
  MISC_UPDATE: "misc-update",
  GAME_STATE: "game-state",

  PLAYER_QUESTION_SELECT: "player-question-select",
  PLAYER_QUESTION_ANSWER: "player-question-answer",
}