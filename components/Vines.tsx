import * as React from "react";
import styled, { keyframes } from "styled-components";
import { BREAKPOINT } from "../constants/constants";

const Vines = () => (
  <>
    <HangingVine />
    <BackgroundVine />
    <LightsBackground>
      <LightShape>🌿</LightShape>
      <LightShape2>🌴</LightShape2>
    </LightsBackground>
  </>
);

const HangingVine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  max-width: 700px;
  height: 100%;
  background-image: url("vine-1.webp");
  background-size: contain;
  background-repeat: no-repeat;
  filter: brightness(0.5) sepia(0.3) blur(2px);
  z-index: -1;
`;

const BackgroundVine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("vine-0.png");
  background-size: cover;
  background-position: 80% center;
  background-repeat: no-repeat;
  filter: brightness(0.6) sepia(0.5);
  z-index: -3;

  @media (min-width: ${BREAKPOINT["large"]}) {
    background-size: contain;
  }
`;

const LightsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: hidden;
  pointer-events: none;
`;

const lightAnimation1 = keyframes`
    0% {
        transform: translate3d(-2rem, -5rem, 0);
    }
    100% {
        transform: translate3d(3rem 0, 0);
    }
`;

const lightAnimation2 = keyframes`
    0% {
        transform: translate3d(-3rem, -3rem, 0);
    }
    100% {
        transform: translate3d(4rem, 0, 0);
    }
`;

const LightShape = styled.p`
  margin: 0;
  position: absolute;
  color: transparent;
  text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
  font-size: 768px;
  mix-blend-mode: multiply;
  animation: 5s ease-in-out infinite alternate ${lightAnimation2};
  filter: blur(25px);

  @media (min-width: ${BREAKPOINT["medium"]}) {
    font-size: 1024px;
  }
`;

const LightShape2 = styled(LightShape)`
  left: 30%;
  text-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  animation: 3s ease-in-out infinite alternate ${lightAnimation1};
`;

export default Vines;
