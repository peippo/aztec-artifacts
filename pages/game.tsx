import { useEffect } from "react";
import Board from "components/Board";
import useStore from "hooks/useStore";
import { GameStore } from "@/interfaces";

const GamePage = () => {
  const startNewGame = useStore((state) => state.startNewGame);
  const positions = useStore((state) => state.positions);

  useEffect(() => {
    startNewGame();
  }, []);

  return <Board positions={positions} />;
};

export default GamePage;
