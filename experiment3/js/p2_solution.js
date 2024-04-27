// project.js - Pixel Overworld!
// Author: Steven Hernandez
// Date: 04/26/24


function generateGrid(numCols, numRows) {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      row.push("_");
    }
    grid.push(row);
  }

  let BaseWidth = floor(random(4, numCols / 2));
  let BaseHeight = floor(random(4, numRows / 2));

  let StartX = floor(numCols / 2 - BaseWidth / 2);
  let StartY = floor(numRows / 2 - BaseHeight / 2);

  for (let i = StartY; i < StartY + BaseHeight; i++) {
    for (let j = StartX; j < StartX + BaseWidth; j++) {
      grid[i][j] = ".";
    }
  }

 
  let hallwayWidth = 3;

  for (let j = 0; j < numCols; j++) {
    for (let w = 0; w < hallwayWidth; w++) {
      grid[StartY - 1 - w][j] = ".";
    }
  }

  for (let j = 0; j < numCols; j++) {
    for (let w = 0; w < hallwayWidth; w++) {
      grid[StartY + BaseHeight + w][j] = ".";
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let w = 0; w < hallwayWidth; w++) {
      grid[i][StartX - 1 - w] = ".";
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let w = 0; w < hallwayWidth; w++) {
      grid[i][StartX + BaseWidth + w] = ".";
    }
  }
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (random() < 0.01 && grid[i][j] === ".") {
        grid[i][j] = "1";
      }
    }
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (random() < 0.03 && grid[i][j] === "_") {
        grid[i][j] = "2";
      }
    }
  }

  return grid;
}

const chestTiles = [
  { x: 0, y: 28 },
  { x: 1, y: 28 },
  { x: 2, y: 28 },
];

function gridCode(grid, i, j, target) {
  let northBit = gridCheck(grid, i - 1, j, target) ? 1 : 0;
  let southBit = gridCheck(grid, i + 1, j, target) ? 1 : 0;
  let eastBit = gridCheck(grid, i, j + 1, target) ? 1 : 0;
  let westBit = gridCheck(grid, i, j - 1, target) ? 1 : 0;

  return (northBit << 3) + (southBit << 2) + (eastBit << 1) + westBit;
}

function drawGrid(grid) {
  background("#32CD3200");

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let tileMap = grid[i][j];

      switch (tileMap) {
        case "_":
          placeTile(i, j, 1, 0);
          break;
        case ".":
          let walls = gridCode(grid, i, j, "_");
          if (walls > 0) {
            placeTile(i, j, 16, 16);
          } else {
            placeTile(i, j, 3, 0);
          }
          break;
        case "1":
          placeTile(i, j, 26, 0);
          break;
        case "2":
          let frameTime = Math.floor(frameCount / FPS) % chestTiles.length;
          let frames = chestTiles[frameTime];
          placeTile(i, j, frames.x, frames.y);
          break;
      }
    }
  }
}

function gridCheck(grid, i, j, target) {
  return (
    i >= 0 &&
    j >= 0 &&
    i < grid.length &&
    j < grid[i].length &&
    grid[i][j] === target
  );
}
