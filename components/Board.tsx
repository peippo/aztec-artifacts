import React from "react";
import styled from "styled-components";
import Tile from "../components/Tile";

const boardPositions = [
  [true, true, true, true],
  [true, false, true, true],
  [true, true, false, true],
  [true, true, true, true],
];

const Board = () => (
  <StyledBoard>
    {boardPositions.map((row, rowIndex) =>
      row.map((hasTile, columnIndex) => {
        if (hasTile) {
          return (
            <Tile
              id={`${rowIndex}-${columnIndex}`}
              row={rowIndex}
              column={columnIndex}
            />
          );
        }
      })
    )}
  </StyledBoard>
);

const StyledBoard = styled.main`
  position: relative;
`;

export default Board;
