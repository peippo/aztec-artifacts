import styled from "styled-components";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
import Board from "../components/Board";
import NewGameButton from "../components/NewGameButton";
import TurnIndicator from "../components/TurnIndicator";
import useStore from "../hooks/useStore";

const IndexPage = () => {
  const gameId = useStore((state) => state.gameId);
  const positions = useStore((state) => state.positions);

  return (
    <Layout>
      <Header>
        <Logo />
        <TurnIndicator />
      </Header>
      {gameId && <Board positions={positions} />}
      <NewGameButton />
    </Layout>
  );
};

const Header = styled.header`
  position: relative;
`;

export default IndexPage;
