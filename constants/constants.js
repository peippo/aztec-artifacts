const BREAKPOINT = {
  medium: "600px",
  large: "800px",
};
const BOARD_COLUMNS = 4;
const BOARD_ROWS = 4;
const BOARD_CELLS = BOARD_COLUMNS * BOARD_ROWS;
const TILE_PAIRS = 7;
const INITIAL_BOARD_POSITIONS = [
  0,
  1,
  2,
  3,
  4,
  undefined,
  undefined,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
];

export {
  BOARD_COLUMNS,
  BOARD_ROWS,
  BOARD_CELLS,
  TILE_PAIRS,
  INITIAL_BOARD_POSITIONS,
  BREAKPOINT,
};
