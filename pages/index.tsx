import { useState } from "react";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import Board from "../components/Board";
import NewGameButton from "../components/NewGameButton";
import TurnIndicator from "../components/TurnIndicator";
import useStore from "../hooks/useStore";

const IndexPage = () => {
  const gameId = useStore((state) => state.gameId);
  const positions = useStore((state) => state.positions);
  const moveRandom = useStore((state) => state.moveRandom);

  return (
    <Layout title="Concentration">
      <Logo />
      {gameId && <Board positions={positions} />}
      <button onClick={() => moveRandom()}>Move random tile</button>
      <NewGameButton />
      <TurnIndicator />
    </Layout>
  );
};

export default IndexPage;
