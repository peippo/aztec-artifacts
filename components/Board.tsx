import React from "react";
import styled from "styled-components";
import { BoardTypes } from "../interfaces";
import { TILE_SIZE } from "../constants/constants";
import Tile from "../components/Tile";

const Board = ({ positions }) => (
  <StyledBoard>
    {positions.map((row, rowIndex) =>
      row.map((id, columnIndex) => {
        if (id) {
          return <Tile key={id} id={id} row={rowIndex} column={columnIndex} />;
        }
      })
    )}
  </StyledBoard>
);

const StyledBoard = styled.main`
  position: relative;
  width: calc(${TILE_SIZE} * 4);
  height: calc(${TILE_SIZE} * 4);
`;

export default Board;
