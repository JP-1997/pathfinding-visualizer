import disjointSet from "disjoint-set";

const kruskal = (grid, rows, columns) => {
  const set = disjointSet();
  let addedWalls = [];
  let removedWalls = [];
  let edges = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (i % 2 === 0 || j % 2 === 0) {
        if (i !== 0 && j !== 0 && i !== rows - 1 && j !== columns - 1) {
          edges.push(grid[i][j]);
        }
      } else set.add(grid[i][j]);
      grid[i][j].isWall = true;
      addedWalls.push(grid[i][j]);
    }
  }
  shuffle(edges);
  edges.forEach(edge => {
    if (
      edge.row % 2 !== 0 &&
      !set.connected(grid[edge.row][edge.column - 1], grid[edge.row][edge.column + 1])
    ) {
      set.union(grid[edge.row][edge.column - 1], grid[edge.row][edge.column + 1]);
      grid[edge.row][edge.column].isWall = false;
      grid[edge.row][edge.column - 1].isWall = false;
      grid[edge.row][edge.column + 1].isWall = false;
      removedWalls.push(grid[edge.row][edge.column - 1]);
      removedWalls.push(grid[edge.row][edge.column]);
      removedWalls.push(grid[edge.row][edge.column + 1]);
    }
    if (
      edge.column % 2 !== 0 &&
      !set.connected(grid[edge.row - 1][edge.column], grid[edge.row + 1][edge.column])
    ) {
      set.union(grid[edge.row - 1][edge.column], grid[edge.row + 1][edge.column]);
      grid[edge.row][edge.column].isWall = false;
      grid[edge.row - 1][edge.column].isWall = false;
      grid[edge.row + 1][edge.column].isWall = false;
      removedWalls.push(grid[edge.row - 1][edge.column]);
      removedWalls.push(grid[edge.row][edge.column]);
      removedWalls.push(grid[edge.row + 1][edge.column]);
    }
  });
  return { addedWalls, removedWalls, animAddedWalls: false };
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export default kruskal;
