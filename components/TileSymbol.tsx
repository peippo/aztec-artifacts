import React from "react";
import bird from "../assets/images/symbol-bird.svg";
import face from "../assets/images/symbol-face.svg";
import lizard from "../assets/images/symbol-lizard.svg";
import llama from "../assets/images/symbol-llama.svg";
import pyramid from "../assets/images/symbol-pyramid.svg";
import snake from "../assets/images/symbol-snake.svg";
import turtle from "../assets/images/symbol-turtle.svg";

const TileSymbol = ({ symbol }) => {
  const symbols = {
    A: bird(),
    B: face(),
    C: lizard(),
    D: llama(),
    E: pyramid(),
    F: snake(),
    G: turtle(),
  };

  return <>{symbols[symbol]}</>;
};

export default TileSymbol;
