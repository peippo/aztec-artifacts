import { useEffect } from "react";
import styled from "styled-components";
import useStore from "hooks/useStore";
import { GameStore } from "@/interfaces";
import Board from "components/Board";
import NewGameButton from "components/NewGameButton";

const IndexPage = () => {
  const resetGame = useStore((state) => state.resetGame);
  const positions = useStore((state) => state.positions);

  useEffect(() => {
    resetGame();
  }, []);

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
