import React from "react";
import styled from "styled-components";
import { BOARD_COLUMNS, TILE_SIZE, BREAKPOINT } from "../constants/constants";
import useStore from "../hooks/useStore";
import Tile from "../components/Tile";

type Props = {
  positions: Array<number | undefined>;
};

const Board = ({ positions }: Props) => {
  const isBoardActive = useStore((state) => state.isBoardActive);

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
  width: calc(${TILE_SIZE["small"]} * 4);
  height: calc(${TILE_SIZE["small"]} * 4);

  @media (min-width: ${BREAKPOINT["medium"]}) {
    width: calc(${TILE_SIZE["medium"]} * 4);
    height: calc(${TILE_SIZE["medium"]} * 4);
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    width: calc(${TILE_SIZE["large"]} * 4);
    height: calc(${TILE_SIZE["large"]} * 4);
  }
`;

export default Board;
