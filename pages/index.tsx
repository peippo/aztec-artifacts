import { useState } from "react";
import Layout from "../components/Layout";
import Board from "../components/Board";
import { BOARD_COLUMNS, BOARD_ROWS, BOARD_CELLS } from "../constants/constants";
import NewGameButton from "../components/NewGameButton";

import useStore from "../hooks/useStore";

const IndexPage = () => {
  const gameId = useStore((state) => state.gameId);
  const [positions, setPositions] = useState<number[]>([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    undefined,
    undefined,
  ]);

  const randomFromArr = (array: Array<any>) =>
    array[Math.floor(Math.random() * array.length)];

  const moveRandom = (positions: Array<number | undefined>) => {
    const startDestinationSearchFromEnd = Math.random() < 0.5;
    let destinationIndex: number;
    let sourceIndices: Array<number> = [];

    if (startDestinationSearchFromEnd) {
      destinationIndex = positions.lastIndexOf(undefined);
    } else {
      destinationIndex = positions.indexOf(undefined);
    }

    // Left from empty space
    if (
      destinationIndex % BOARD_COLUMNS !== 0 &&
      positions[destinationIndex - 1] !== undefined
    ) {
      sourceIndices.push(destinationIndex - 1);
    }

    // Right from empty space
    if (
      destinationIndex % BOARD_COLUMNS !== BOARD_COLUMNS - 1 &&
      positions[destinationIndex + 1] !== undefined
    ) {
      sourceIndices.push(destinationIndex + 1);
    }

    // Up from empty space
    if (
      destinationIndex >= BOARD_ROWS &&
      positions[destinationIndex - BOARD_COLUMNS] !== undefined
    ) {
      sourceIndices.push(destinationIndex - BOARD_COLUMNS);
    }

    // Down from empty space
    if (
      destinationIndex <= BOARD_CELLS - BOARD_COLUMNS &&
      positions[destinationIndex + BOARD_COLUMNS] !== undefined
    ) {
      sourceIndices.push(destinationIndex + BOARD_COLUMNS);
    }

    const sourceIndex = randomFromArr(sourceIndices);

    const newPositions = [...positions];

    [newPositions[destinationIndex], newPositions[sourceIndex]] = [
      newPositions[sourceIndex],
      newPositions[destinationIndex],
    ];

    setPositions(newPositions);
  };

  return (
    <Layout title="Concentration">
      {gameId && <Board positions={positions} />}
      <button onClick={() => moveRandom(positions)}>Move random tile</button>
      <NewGameButton />
    </Layout>
  );
};

export default IndexPage;
