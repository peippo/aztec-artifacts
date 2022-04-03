import { useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import useStore from "hooks/useStore";
import { GameStore, TileType } from "@/interfaces";
import { TILE_SIZE, BREAKPOINT } from "@/constants";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";
import TileSymbol from "components/TileSymbol";

type Props = {
  id: number;
  row: number;
  column: number;
};

const checkTileSelector = (state: GameStore) => state.checkTile;
const isFadingOutSymbolSelector = (state: GameStore) => state.isFadingOutSymbol;

const Tile = ({ id, row, column }: Props) => {
  const handleCheckTile = useStore(checkTileSelector);
  const isFadingOutSymbol = useStore(isFadingOutSymbolSelector);
  const isRevealed = useStore(
    useCallback((state) => state.isRevealed(id), [id])
  );
  const isMatched = useStore(useCallback((state) => state.isMatched(id), [id]));

  return (
    <>
      {/* Revealed or matched tile */}
      <Transition
        key={`flipped-${id}`}
        in={isRevealed || isMatched}
        unmountOnExit
        timeout={500}
      >
        {(status: TransitionStatus) => (
          <RevealedTile tileId={id} row={row} column={column} status={status}>
            <Transition
              in={isMatched || !isFadingOutSymbol}
              timeout={{ enter: 1000, exit: 1250 }}
            >
              {(status: TransitionStatus) => (
                <TileSymbol tileId={id} status={status} isMatched={isMatched} />
              )}
            </Transition>
          </RevealedTile>
        )}
      </Transition>

      {/* Normal tile */}
      <Transition
        key={id}
        in={!isRevealed && !isMatched}
        timeout={0}
        unmountOnExit
      >
        {(status: TransitionStatus) => (
          <StyledTile
            tileId={id}
            row={row}
            column={column}
            onClick={() => handleCheckTile(id)}
            status={status}
          ></StyledTile>
        )}
      </Transition>
    </>
  );
};

const StyledTile = styled.button<TileType>`
  position: absolute;
  top: ${({ row }) => `calc(${row} * ${TILE_SIZE["small"]})`};
  left: ${({ column }) => `calc(${column} * ${TILE_SIZE["small"]})`};
  width: ${TILE_SIZE["small"]};
  height: ${TILE_SIZE["small"]};
  border: 0;
  transition: all 0.25s ease-out;
  background-color: transparent;
  background-image: ${({ tileId }) => `url("tile-${tileId % 3}.svg")`};
  color: var(--color-dark-blue);

  @media (min-width: ${BREAKPOINT["medium"]}) {
    top: ${({ row }) => `calc(${row} * ${TILE_SIZE["medium"]})`};
    left: ${({ column }) => `calc(${column} * ${TILE_SIZE["medium"]})`};
    width: ${TILE_SIZE["medium"]};
    height: ${TILE_SIZE["medium"]};
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    top: ${({ row }) => `calc(${row} * ${TILE_SIZE["large"]})`};
    left: ${({ column }) => `calc(${column} * ${TILE_SIZE["large"]})`};
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
    cursor: var(--cursor-url), pointer;
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
