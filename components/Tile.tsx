import React from "react";
import styled from "styled-components";
import { TileType } from "../interfaces";
import { TILE_SIZE } from "../constants/constants";

const Tile = ({ id, row, column }: TileType) => (
  <StyledTile id={id} row={row} column={column}>
    {id}
  </StyledTile>
);

const StyledTile = styled.button<TileType>`
  position: absolute;
  top: ${(props) => `calc(${props.row} * ${TILE_SIZE})`};
  left: ${(props) => `calc(${props.column} * ${TILE_SIZE})`};
  border: 0;
  background: salmon;
  width: ${TILE_SIZE};
  height: ${TILE_SIZE};
  transition: all 0.25s;
`;

export default Tile;
