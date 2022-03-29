import React from "react";
import styled, { keyframes, css } from "styled-components";
import { TransitionStatus } from "react-transition-group/Transition";
import useStore from "../hooks/useStore";
import bird from "../assets/images/symbol-bird.svg";
import face from "../assets/images/symbol-face.svg";
import lizard from "../assets/images/symbol-lizard.svg";
import llama from "../assets/images/symbol-llama.svg";
import pyramid from "../assets/images/symbol-pyramid.svg";
import snake from "../assets/images/symbol-snake.svg";
import turtle from "../assets/images/symbol-turtle.svg";

const TileSymbol = ({ id, status, isMatched }) => {
  const matchedTiles = useStore((state) => state.matchedTiles);
  const revealedTiles = useStore((state) => state.revealedTiles);
  const { symbol } = isMatched
    ? matchedTiles.find((tile) => tile.id === id) || {}
    : revealedTiles.find((tile) => tile.id === id) || {};

  const symbols = {
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
