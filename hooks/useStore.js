import create from "zustand";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { INITIAL_BOARD_POSITIONS } from "../constants/constants";
import { moveRandomPosition, shuffleArray } from "../utils/utils";

const initialSettings = {
  gameId: "",
  currentTurn: 0,
  isBoardActive: false,
  currentTileIds: [],
  revealedTiles: [],
  matchedTiles: [],
  positions: INITIAL_BOARD_POSITIONS,
};

const useStore = create((set, get) => ({
  ...initialSettings,

  startNewGame: async () => {
    let response = await fetch(`${API_BASE_URL}/new`);
    response = await response.json();
    const { id } = response;
    set({
      gameId: id,
      currentTurn: 1,
      isBoardActive: true,
      currentTileIds: [],
      revealedTiles: [],
      matchedTiles: [],
      positions: shuffleArray([...INITIAL_BOARD_POSITIONS]),
    });
  },
  resetGame: () => {
    set({
      ...initialSettings,
    });
  },
  isRevealed: (id) => get().revealedTiles.some((tile) => tile.id === id),
  isMatched: (id) => get().matchedTiles.some((tile) => tile.id === id),
  moveRandom: () =>
    set(() => ({
      positions: moveRandomPosition(get().positions),
    })),
  checkTile: async (id) => {
    if (!get().isBoardActive) return;

    set((state) => ({
      currentTileIds: [id, ...state.currentTileIds],
      isBoardActive: false,
    }));

    const gameId = get().gameId;
    const tileParams = get()
      .currentTileIds.map((tileId) => `&tileId=${tileId}`)
      .join("");

    let response = await fetch(
      `${API_BASE_URL}/flip?gameId=${gameId}${tileParams}`
    );
    response = await response.json();
    const { revealedTiles, isMatch, isFirst, turn } = response;

    set((state) => ({
      revealedTiles: [...revealedTiles, ...state.revealedTiles],
      currentTurn: turn,
    }));

    if (isMatch) {
      setTimeout(() => {
        set((state) => ({
          matchedTiles: [...revealedTiles, ...state.matchedTiles],
        }));
      }, 1000);
    }

    if (isFirst) {
      set(() => ({
        isBoardActive: true,
      }));
    } else {
      setTimeout(() => {
        set(() => ({
          currentTileIds: [],
          revealedTiles: [],
        }));
      }, 1500);
      setTimeout(() => {
        get().moveRandom();
      }, 1750);
      setTimeout(() => {
        set(() => ({
          isBoardActive: true,
        }));
      }, 2000);
    }
  },
}));

export default useStore;
