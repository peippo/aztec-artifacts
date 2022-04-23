import styled from "styled-components";
import { useEffect } from "react";
import Board from "components/Board";
import useStore from "hooks/useStore";
import { GameStore } from "@/interfaces";
import { BREAKPOINT } from "@/constants";

const startNewGameSelector = (state: GameStore) => state.startNewGame;
const positionsSelector = (state: GameStore) => state.positions;
const gameIdSelector = (state: GameStore) => state.gameId;

const GamePage = () => {
  const startNewGame = useStore(startNewGameSelector);
  const gameId = useStore(gameIdSelector);
  const positions = useStore(positionsSelector);

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <Wrapper>
      <Board positions={positions} />

      {!gameId && (
        <LoadingText>
          Loading
          <br />
          board...
        </LoadingText>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const LoadingText = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: var(--tile-size);
  left: var(--tile-size);
  color: var(--color-yellow);
  font-size: 1.2rem;
  padding: 1rem 2rem;
  margin: 0;
  font-family: var(--font-family);
  transition: all 0.25s;
  z-index: 15;

  @media (min-width: ${BREAKPOINT["medium"]}) {
    top: calc(var(--tile-size) * 1.2);
    left: calc(var(--tile-size) * 1.2);
    font-size: 1.25rem;
    padding: 0.25rem 2.5rem;
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    top: calc(var(--tile-size) * 1.25);
    left: calc(var(--tile-size) * 1.25);
    font-size: 1.5rem;
    padding: 0.25rem 2.5rem;
  }
`;

export default GamePage;
