import * as React from "react";
import styled from "styled-components";
import { BREAKPOINT } from "../constants/constants";

const Logo = () => (
  <Heading>
    <Main>Aztec</Main> <Sub>Artifacts</Sub>
  </Heading>
);

const Heading = styled.h1`
  margin: 0 auto 2rem;
  text-align: center;
  text-transform: uppercase;
  line-height: 1;
  font-size: 1rem;

  @media (min-width: ${BREAKPOINT["medium"]}) {
    font-size: 1.25rem;
  }

  @media (min-width: ${BREAKPOINT["large"]}) {
    font-size: 1.5rem;
  }
`;

const Main = styled.span`
  position: relative;
  display: block;
  color: var(--color-yellow);
  font-size: 4em;
  text-shadow: 0 2px 1px #3027009c, 0 5px 1px #5d4b00;
`;

const Sub = styled.span`
  color: var(--color-white);
  font-size: 2em;
  font-weight: 100;
`;

export default Logo;
