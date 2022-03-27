import { BOARD_COLUMNS, BOARD_ROWS, BOARD_CELLS } from "../constants/constants";

const randomFromArr = (array: Array<any>) =>
  array[Math.floor(Math.random() * array.length)];

export const moveRandomPosition = (positions: Array<object | undefined>) => {
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

  return newPositions;
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};
