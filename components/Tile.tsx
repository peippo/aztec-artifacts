import React from "react";
import styled, { keyframes, css } from "styled-components";
import { TileType } from "../interfaces";
import { TILE_SIZE, BREAKPOINT } from "../constants/constants";
import useStore from "../hooks/useStore";
import TileSymbol from "./TileSymbol";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

const Tile = ({ id, row, column }) => {
  const checkTile = useStore((state) => state.checkTile);
  const isRevealed = useStore((state) => state.isRevealed(id));
  const revealedTiles = useStore((state) => state.revealedTiles);
  const matchedTiles = useStore((state) => state.matchedTiles);
  const isMatched = matchedTiles.some((tile) => tile.id === id);

  if (isMatched) {
    const { symbol } = matchedTiles.find((tile) => tile.id === id);

    return (
      <MatchedTile id={id} row={row} column={column} status={null}>
        <Transition
          appear={true}
          in={true}
          timeout={{
            enter: 1000,
          }}
        >
          {(status: TransitionStatus) => (
            <TileSymbol symbol={symbol} status={status} isMatched={true} />
          )}
        </Transition>
      </MatchedTile>
    );
  } else if (isRevealed) {
    const { symbol } = revealedTiles.find((tile) => tile.id === id);

    return (
      <Transition
        key={id}
        appear={true}
        in={true}
        timeout={{
          enter: 500,
        }}
      >
        {(status: TransitionStatus) => (
          <RevealedTile id={id} row={row} column={column} status={status}>
            <Transition
              appear={true}
              in={true}
              timeout={{
                enter: 1000,
              }}
            >
              {(status: TransitionStatus) => (
                <TileSymbol symbol={symbol} status={status} isMatched={false} />
              )}
            </Transition>
          </RevealedTile>
        )}
      </Transition>
    );
  } else {
    return (
      <StyledTile
        id={id}
        row={row}
        column={column}
        onClick={() => checkTile(id)}
        status={null}
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
  transition: all 0.25s ease-out;
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

  &:hover {
    opacity: 0.85;
    transform: scale(0.98);
    cursor: pointer;
  }
`;

const RevealedTile = styled(StyledTile)<{ status: TransitionStatus }>`
  &:hover {
    opacity: inherit;
    transform: inherit;
    cursor: inherit;
  }

  ${({ status }) =>
    status === "entering" &&
    css`
      z-index: 10;
    `}

  ${({ status }) =>
    (status === "entering" || status === "entered") &&
    css`
      animation-name: ${revealInAnimation};
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    `}
`;

const MatchedTile = styled(StyledTile)`
  &:hover {
    opacity: inherit;
    transform: inherit;
    cursor: inherit;
  }
`;

const revealInAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  80% {
    transform: scale(1.2);
    box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.5);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
`;

export default Tile;
