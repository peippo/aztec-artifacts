const BREAKPOINT = {
  medium: "600px",
  large: "1000px",
};
const TILE_SIZE = {
  small: "80px",
  medium: "100px",
  large: "120px",
};
const BOARD_COLUMNS = 4;
const BOARD_ROWS = 4;
const BOARD_CELLS = BOARD_COLUMNS * BOARD_ROWS;
const INITIAL_BOARD_POSITIONS = [
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
];

export {
  TILE_SIZE,
  BOARD_COLUMNS,
  BOARD_ROWS,
  BOARD_CELLS,
  INITIAL_BOARD_POSITIONS,
  BREAKPOINT,
};
