import { useState } from "react";
import Layout from "../components/Layout";
import Board from "../components/Board";
import { BoardTypes, BoardRow } from "../interfaces";

const IndexPage = () => {
  const [positions, setPositions] = useState<BoardRow[]>([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, undefined, undefined],
  ]);

  const randomFromArr = (array: Array<any>) =>
    Math.floor(Math.random() * array.length);

  const moveRandom = (positions: Array<Array<number | undefined>>) => {
    const getRandomRowIndex = () => randomFromArr(positions);
    let rowIndex = getRandomRowIndex();

    let rowWithSpace = positions[rowIndex];

    while (!rowWithSpace.includes(undefined)) {
      rowIndex = getRandomRowIndex();
      rowWithSpace = positions[rowIndex];
    }

    // What if we have two free spaces on one row?
    const columnIndex = rowWithSpace.indexOf(undefined);

    let newRowIndex: number;
    let newColumnIndex: number;

    const getNewPosition = () => {
      const possibleNewRows = [
        Math.max(0, rowIndex - 1),
        rowIndex,
        Math.min(positions.length - 1, rowIndex + 1),
      ];

      newRowIndex = possibleNewRows[randomFromArr(possibleNewRows)];

      const possibleNewColumns =
        newRowIndex === rowIndex
          ? [Math.max(0, columnIndex - 1), Math.min(3, columnIndex + 1)]
          : [columnIndex];

      newColumnIndex = possibleNewColumns[randomFromArr(possibleNewColumns)];
    };

    getNewPosition();

    while (!positions[newRowIndex][newColumnIndex]) {
      getNewPosition();
    }

    const newPositions = [...positions];

    [
      newPositions[rowIndex][columnIndex],
      newPositions[newRowIndex][newColumnIndex],
    ] = [
      newPositions[newRowIndex][newColumnIndex],
      newPositions[rowIndex][columnIndex],
    ];

    setPositions(newPositions);
  };

  return (
    <Layout title="Concentration">
      <Board positions={positions} />
      <button onClick={() => moveRandom(positions)}>Move random tile</button>
    </Layout>
  );
};

export default IndexPage;
