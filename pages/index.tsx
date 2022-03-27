import { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Board from "../components/Board";
import NewGameButton from "../components/NewGameButton";
import useStore from "../hooks/useStore";
import { INITIAL_BOARD_POSITIONS } from "../constants/constants";

const IndexPage = () => {
  const resetGame = useStore((state) => state.resetGame);

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <Layout>
      <BoardWrapper>
        <Board positions={INITIAL_BOARD_POSITIONS} />
        <NewGameButton />
      </BoardWrapper>
    </Layout>
  );
};

const BoardWrapper = styled.div`
  position: relative;
`;

export default IndexPage;
