import * as React from "react";
import useStore from "../hooks/useStore";
const TurnIndicator = () => {
  const currentTurn = useStore((state) => state.currentTurn);

  if (!currentTurn) return <></>;

  return <p>Turn: {currentTurn}</p>;
};

export default TurnIndicator;
