import React from "react";
import useStore from "../hooks/useStore";

const NewGameButton = () => {
  const startNewGame = useStore((state) => state.startNewGame);
  return <button onClick={startNewGame}>Start new game</button>;
};

export default NewGameButton;
