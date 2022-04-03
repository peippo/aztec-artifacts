import styled from "styled-components";
import Link from "next/link";
import { BREAKPOINT } from "@/constants";

const NewGameButton = () => {
  return (
    <Link href="/game">
      <StyledButton>
        Start the <LargeText>excavation</LargeText>
      </StyledButton>
    </Link>
  );
};

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-weight: 100;
  position: absolute;
  top: var(--tile-size);
  left: var(--tile-size);
  width: calc(var(--tile-size) * 2);
  height: var(--tile-size);
  background-color: transparent;
  color: var(--color-yellow);
  border-radius: 3px;
  border: 2px solid var(--color-yellow);
  font-size: 12px;
  padding: 0.5rem 1rem;
  margin: 0;
  font-family: var(--font-family);
  transition: all 0.25s;
  z-index: 15;

  @media (min-width: ${BREAKPOINT["medium"]}) {
    top: calc(var(--tile-size) * 1.2);
    left: calc(var(--tile-size) * 1.2);
    height: auto;
    width: auto;
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    top: calc(var(--tile-size) * 1.25);
    left: calc(var(--tile-size) * 1.25);
    font-size: 15px;
  }

  &:hover,
  &:focus {
    background-color: var(--color-yellow);
    color: var(--color-dark-blue);
    cursor: var(--cursor-url), pointer;
  }

  &:focus {
    outline: none;
  }
`;

const LargeText = styled.span`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 1.5em;
`;

export default NewGameButton;
