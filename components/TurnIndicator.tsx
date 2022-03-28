import * as React from "react";
import styled from "styled-components";
import useStore from "../hooks/useStore";
import { BREAKPOINT } from "../constants/constants";

const TurnIndicator = () => {
  const currentTurn = useStore((state) => state.currentTurn);

  if (!currentTurn) return <></>;

  return (
    <StyledTurnIndicator>
      <Label>Turn</Label>
      {currentTurn}
    </StyledTurnIndicator>
  );
};

const StyledTurnIndicator = styled.p`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0;
  color: var(--color-yellow);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-weight: 900;
  font-size: 20px;
  border: 3px solid var(--color-cyan);
  border-radius: 1000px;
  z-index: 15;

  @media (min-width: ${BREAKPOINT["medium"]}) {
    right: -30px;
    font-size: 26px;
    width: 55px;
    height: 55px;
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    font-size: 30px;
    width: 65px;
    height: 65px;
  }
`;

const Label = styled.span`
  position: absolute;
  top: -1.2rem;
  border-radius: 6px;
  padding: 0.3rem 0.4rem;
  font-weight: 100;
  color: var(--color-dark-blue);
  text-transform: uppercase;
  font-size: 0.5em;
  background-color: var(--color-cyan);
`;

export default TurnIndicator;
