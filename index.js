// Implementation of the backtracking approach
// to solving a sudoku board

// Author: stefanjen.com

// Rules of a sudoku puzzle
// 1. Each row must have the numbers 1-9 once.
// 2. Each column must have the numbers 1-9 once.
// 3. Each of the nine 3x3 sub-boxes of the grid must have the numbers 1-9 once.

let board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// Empty slots are represented as 0's.

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    if (i % 3 == 0 && i != 0) {
      // 3 and 6
      process.stdout.write("------|-------|------\n");
    }
    for (let j = 0; j < board[i].length; j++) {
      if (j % 3 == 0 && j != 0) {
        // 3 and 6
        process.stdout.write(" | ");
      }
      if (j == 8) {
        process.stdout.write(board[i][j] + "\n");
      } else if (j == 2 || j == 5) {
        process.stdout.write(board[i][j] + "");
      } else {
        process.stdout.write(board[i][j] + " ");
      }
    }
  }
};

const isValid = (num, position) => {
  // checking row validation
  for (let i = 0; i < board.length; i++) {
    if (board[position[0]][i] == num) {
      // e.g [0,0] [0,1] [0,2] [0,3] ...
      return false;
    }
  }
  // checking col validation
  for (let i = 0; i < board[0].length; i++) {
    if (board[i][position[1]] == num) {
      // e.g [0,1] [1,1] [2,1] [3,1]...
      return false;
    }
  }
  // checking box validation
  const boxRowStart = Math.floor(position[0] / 3) * 3; // e.g 2 / 3 floored = 0 * 3 = 0
  const boxColStart = Math.floor(position[1] / 3) * 3; // e.g 5 / 3 floored = 1 * 3 = 3
  for (let i = boxRowStart; i < boxRowStart + 3; i++) {
    for (let j = boxColStart; j < boxColStart + 3; j++) {
      // [0,3] [0,4] [0,5]
      // [1,3] [1,4] [1,5]
      // [2,3] [2,4] [2,5]
      if (board[i][j] == num && i != position[0] && j != position[1]) {
        return false;
      }
    }
  }
  return true;
};

const findEmptySlot = () => {
  for (let i = 0; i < board.length; i++) {
    // row
    for (let j = 0; j < board[i].length; j++) {
      // col
      if (board[i][j] == 0) {
        return [i, j];
      }
    }
  }
};

const solveBoard = () => {
  let row;
  let col;
  let find = findEmptySlot(); // find an empty slot (0)
  if (!find) {
    return true; // no empty slot, we return true
  } else {
    row = find[0];
    col = find[1];
  }
  for (let number = 1; number < 10; number++) {
    if (isValid(number, [row, col])) {
      board[row][col] = number;
      if (solveBoard()) {
        // recursively call the function untill we find the solution
        return true;
      }
      board[row][col] = 0; // we backtrack and reset the position
    }
  }
  return false;
};

console.log("\nPre-solved board");
printBoard(board);
solveBoard();
console.log("\nSolved board");
printBoard(board);
