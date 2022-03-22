import React from "react";
import styled from "styled-components";
import { BOARD_COLUMNS, TILE_SIZE } from "../constants/constants";
import Tile from "../components/Tile";

const Board = ({ positions }) => {
  return (
    <StyledBoard>
      {positions
        .map((id, index) => ({ id, index }))
        .filter(({ id }) => id !== undefined)
        .sort((a, b) => a.id - b.id)
        .map(({ id, index }) => {
          let rowIndex = Math.floor(index / BOARD_COLUMNS);
          let columnIndex = index % BOARD_COLUMNS;

          return <Tile key={id} id={id} row={rowIndex} column={columnIndex} />;
        })}
    </StyledBoard>
  );
};

const StyledBoard = styled.main`
  position: relative;
  width: calc(${TILE_SIZE} * 4);
  height: calc(${TILE_SIZE} * 4);
`;

export default Board;
