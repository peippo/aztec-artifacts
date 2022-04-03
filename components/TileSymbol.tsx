import styled, { keyframes, css } from "styled-components";
import useStore from "hooks/useStore";
import { GameStore } from "@/interfaces";
import { TransitionStatus } from "react-transition-group/Transition";
import bird from "@/images/symbol-bird.svg";
import face from "@/images/symbol-face.svg";
import lizard from "@/images/symbol-lizard.svg";
import llama from "@/images/symbol-llama.svg";
import pyramid from "@/images/symbol-pyramid.svg";
import snake from "@/images/symbol-snake.svg";
import turtle from "@/images/symbol-turtle.svg";

type Props = {
  tileId: number;
  status: TransitionStatus;
  isMatched: boolean;
};

type Symbols = {
  [key: string]: React.SVGProps<SVGSVGElement>;
};

const matchedTilesSelector = (state: GameStore) => state.matchedTiles;
const revealedTilesSelector = (state: GameStore) => state.revealedTiles;

const TileSymbol = ({ tileId, status, isMatched }: Props) => {
  const matchedTiles = useStore(matchedTilesSelector);
  const revealedTiles = useStore(revealedTilesSelector);
  const { symbol } = isMatched
    ? matchedTiles.find((tile) => tile.id === tileId) || {}
    : revealedTiles.find((tile) => tile.id === tileId) || {};

  const symbols: Symbols = {
    A: bird(),
    B: face(),
    C: lizard(),
    D: llama(),
    E: pyramid(),
    F: snake(),
    G: turtle(),
  };

  if (!symbol) return <></>;

  return (
    <StyledSymbol status={status} isMatched={isMatched}>
      {symbols[symbol]}
    </StyledSymbol>
  );
};

const StyledSymbol = styled.span<{
  status: TransitionStatus;
  isMatched: boolean;
}>`
  animation-duration: 1s;
  animation-fill-mode: forwards;

  svg {
    filter: drop-shadow(0 0 0 rgb(0 0 0 / 0));
    transition: filter 0.33s;
  }

  ${({ status, isMatched }) => {
    if (isMatched) {
      return (
        (status === "entering" || status === "entered") &&
        css`
          animation-name: ${matchedInAnimation};

          svg {
            filter: drop-shadow(-1px -2px 2px rgb(0 0 0 / 0.4));
          }
        `
      );
    } else
      return (
        (status === "entering" || status === "entered") &&
        css`
          animation-name: ${inAnimation};
        `
      );
  }}

  ${({ status }) =>
    status === "exiting" &&
    css`
      animation-name: ${outAnimation};
      animation-duration: 1.25s;
    `}
`;

const inAnimation = keyframes`
  0% {
    opacity: 0;
  }

  40% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

const outAnimation = keyframes`
  0% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const matchedInAnimation = keyframes`
  0% {
    color: var(--color-dark-blue);
  }
  
  100% {
    color: var(--color-cyan);
  }
`;

export default TileSymbol;
