import React from "react";
import styled from "styled-components";
import { TileInterface } from "../interfaces";
import { TILE_SIZE } from "../constants/constants";

const Tile = ({ id, row, column }: TileInterface) => (
  <StyledTile id={undefined} row={row} column={column}>
    {id}
  </StyledTile>
);

const StyledTile = styled.button<TileInterface>`
  position: absolute;
  top: ${(props) => `calc(${props.row} * ${TILE_SIZE})`};
  left: ${(props) => `calc(${props.column} * ${TILE_SIZE})`};
  border: 0;
  background: salmon;
  width: ${TILE_SIZE};
  height: ${TILE_SIZE};
`;

export default Tile;
