import { useEffect } from "react";
import Layout from "../components/Layout";
import Board from "../components/Board";
import useStore from "../hooks/useStore";

const GamePage = () => {
  const startNewGame = useStore((state) => state.startNewGame);
  const positions = useStore((state) => state.positions);

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <Layout>
      <Board positions={positions} />
    </Layout>
  );
};

export default GamePage;
