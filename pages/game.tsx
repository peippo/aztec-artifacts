import { useEffect } from "react";
import Board from "components/Board";
import useStore from "hooks/useStore";
import { GameStore } from "@/interfaces";

const startNewGameSelector = (state: GameStore) => state.startNewGame;
const positionsSelector = (state: GameStore) => state.positions;

const GamePage = () => {
  const startNewGame = useStore(startNewGameSelector);
  const positions = useStore(positionsSelector);

  useEffect(() => {
    startNewGame();
  }, []);

  return <Board positions={positions} />;
};

export default GamePage;
