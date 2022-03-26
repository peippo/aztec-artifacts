import React from "react";
import styled from "styled-components";
import { TileType } from "../interfaces";
import { TILE_SIZE } from "../constants/constants";
import useStore from "../hooks/useStore";
import TileSymbol from "./TileSymbol";

const Tile = ({ id, row, column }: TileType) => {
  const checkTile = useStore((state) => state.checkTile);
  const isRevealed = useStore((state) => state.isRevealed(id));
  const revealedTiles = useStore((state) => state.revealedTiles);
  const matchedTiles = useStore((state) => state.matchedTiles);
  const isMatched = matchedTiles.some((tile) => tile.id === id);

  if (isMatched) {
    const { symbol } = matchedTiles.find((tile) => tile.id === id);

    return (
      <StyledTile id={id} row={row} column={column}>
        <TileSymbol symbol={symbol} />
      </StyledTile>
    );
  } else if (isRevealed) {
    const { symbol } = revealedTiles.find((tile) => tile.id === id);

    return (
      <StyledTile id={id} row={row} column={column}>
        <TileSymbol symbol={symbol} />
      </StyledTile>
    );
  } else {
    return (
      <StyledTile
        id={id}
        row={row}
        column={column}
        onClick={() => checkTile(id)}
      ></StyledTile>
    );
  }
};

const StyledTile = styled.button<TileType>`
  position: absolute;
  top: ${(props) => `calc(${props.row} * ${TILE_SIZE})`};
  left: ${(props) => `calc(${props.column} * ${TILE_SIZE})`};
  border: 0;
  background: salmon;
  width: ${TILE_SIZE};
  height: ${TILE_SIZE};
  transition: all 0.25s;

  svg {
    max-height: 80%;
  }
`;

export default Tile;
