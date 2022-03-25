import create from "zustand";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
import { INITIAL_BOARD_POSITIONS } from "../constants/constants";
import { moveRandomPosition } from "../utils/utils";

const useStore = create((set, get) => ({
  gameId: "",
  currentTurn: 0,
  currentTileIds: [],
  revealedTiles: [],
  matchedTiles: [],
  positions: INITIAL_BOARD_POSITIONS,
  isBoardActive: false,

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
    });
  },
  isRevealed: (id) => get().currentTileIds.includes(id),
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
      set((state) => ({
        matchedTiles: [...revealedTiles, ...state.matchedTiles],
      }));
    }

    if (!isFirst) {
      setTimeout(() => {
        set(() => ({
          currentTileIds: [],
          revealedTiles: [],
          isBoardActive: true,
        }));
      }, 1000);
    } else {
      set(() => ({
        isBoardActive: true,
      }));
    }
  },
}));

export default useStore;
