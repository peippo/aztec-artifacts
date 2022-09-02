import { useEffect, useRef } from "react";
import styled from "styled-components";
import { BOARD_COLUMNS } from "@/constants";
import { GameStore } from "@/interfaces";
import useStore from "hooks/useStore";
import Tile from "components/Tile";

type Props = {
  positions: Array<number | undefined>;
};

const isBoardActiveSelector = (state: GameStore) => state.isBoardActive;
const isCompletedSelector = (state: GameStore) => state.isCompleted;
const moveRandomSelector = (state: GameStore) => state.moveRandom;

const Board = ({ positions }: Props) => {
  const isBoardActive = useStore(isBoardActiveSelector);
  const isCompleted = useStore(isCompletedSelector);
  const moveRandom = useStore(moveRandomSelector);

  // Start moving tiles randomly when the board is completed
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isCompleted) {
      intervalRef.current = window.setInterval(moveRandom, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [moveRandom, isCompleted]);

  return (
    <StyledBoard isBoardActive={isBoardActive}>
      {positions
        .map((id, index) => ({ id, index }))
        .filter(({ id }) => id !== undefined)
        .sort((a, b) => a.id! - b.id!)
        .map(({ id, index }) => {
          let rowIndex = Math.floor(index / BOARD_COLUMNS);
          let columnIndex = index % BOARD_COLUMNS;

          return <Tile key={id} id={id!} row={rowIndex} column={columnIndex} />;
        })}
    </StyledBoard>
  );
};

const StyledBoard = styled.main<{ isBoardActive: boolean }>`
  pointer-events: ${({ isBoardActive }) => (isBoardActive ? "auto" : "none")};
  position: relative;
  width: calc(var(--tile-size) * 4);
  height: calc(var(--tile-size) * 4);
`;

export default Board;
