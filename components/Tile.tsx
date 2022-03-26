import React from "react";
import styled from "styled-components";
import { TileType } from "../interfaces";
import { TILE_SIZE, BREAKPOINT } from "../constants/constants";
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
  top: ${(props) => `calc(${props.row} * ${TILE_SIZE["small"]})`};
  left: ${(props) => `calc(${props.column} * ${TILE_SIZE["small"]})`};
  width: ${TILE_SIZE["small"]};
  height: ${TILE_SIZE["small"]};
  border: 0;
  transition: all 0.25s;
  background-color: transparent;
  background-image: ${(props) => `url("tile-${parseInt(props.id) % 3}.svg")`};
  color: var(--color-dark-blue);

  @media (min-width: ${BREAKPOINT["medium"]}) {
    top: ${(props) => `calc(${props.row} * ${TILE_SIZE["medium"]})`};
    left: ${(props) => `calc(${props.column} * ${TILE_SIZE["medium"]})`};
    width: ${TILE_SIZE["medium"]};
    height: ${TILE_SIZE["medium"]};
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    top: ${(props) => `calc(${props.row} * ${TILE_SIZE["large"]})`};
    left: ${(props) => `calc(${props.column} * ${TILE_SIZE["large"]})`};
    width: ${TILE_SIZE["large"]};
    height: ${TILE_SIZE["large"]};
  }

  svg {
    max-width: 75%;
    max-height: 75%;
  }
`;

export default Tile;
