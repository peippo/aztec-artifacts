import { useEffect } from "react";
import styled from "styled-components";
import Board from "../components/Board";
import NewGameButton from "../components/NewGameButton";
import useStore from "../hooks/useStore";

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
