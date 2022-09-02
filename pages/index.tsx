import { useEffect } from "react";
import styled from "styled-components";
import useStore from "hooks/useStore";
import { GameStore } from "@/interfaces";
import Board from "components/Board";
import NewGameButton from "components/NewGameButton";

const resetGameSelector = (state: GameStore) => state.resetGame;
const positionsSelector = (state: GameStore) => state.positions;

const IndexPage = () => {
  const resetGame = useStore(resetGameSelector);
  const positions = useStore(positionsSelector);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  return (
    <Wrapper>
      <Board positions={positions} />
      <NewGameButton />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default IndexPage;
