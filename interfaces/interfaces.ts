import { TransitionStatus } from "react-transition-group/Transition";

export interface TileType {
  tileId: number;
  row: number;
  column: number;
  status: string | null;
}

export interface TransitionedTileType extends TileType {
  status: TransitionStatus;
}

export interface GameStore {
  gameId: string;
  currentTurn: number;
  isBoardActive: boolean;
  currentTileIds: Array<number>;
  revealedTiles: {
    id: number;
    symbol: string;
  }[];
  matchedTiles: {
    id: number;
    symbol: string;
  }[];
  isCompleted: boolean;
  isFadingOutSymbol: boolean;
  positions: Array<number | undefined>;
  startNewGame: () => void;
  resetGame: () => void;
  isRevealed: (id: number) => boolean;
  isMatched: (id: number) => boolean;
  moveRandom: () => void;
  checkTile: (id: number) => void;
}

export interface NewGameResponse {
  id: string;
}

export interface CheckResponse {
  revealedTiles: {
    id: number;
    symbol: string;
  }[];
  isMatch: boolean;
  isFirst: boolean;
  turn: number;
}
