import create from "zustand";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useStore = create((set, get) => ({
  gameId: "",
  currentTurn: 0,
  currentTileIds: [],
  revealedTiles: [],
  matchedTiles: [],

  startNewGame: async () => {
    let response = await fetch(`${API_BASE_URL}/new`);
    response = await response.json();
    set({ gameId: response.id });
  },

  isRevealed: (id) => get().currentTileIds.includes(id),
  isMatched: (id) => get().matchedTiles.some((tile) => tile.id === id),

  checkTile: async (id) => {
    set((state) => ({ currentTileIds: [id, ...state.currentTileIds] }));

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
        set(() => ({ currentTileIds: [] }));
        set(() => ({ revealedTiles: [] }));
      }, 1000);
    }
  },
}));

export default useStore;