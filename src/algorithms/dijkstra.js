import PriorityQueue from 'js-priority-queue';

const dijkstra = (grid, startNode, finishNode, allowDiag) => {
  let visitedNodes = [];
  let shortestPath = [];
  let pq = new PriorityQueue({
    comparator: function(a, b) {
      return a.distance - b.distance;
    }
  });
  grid.forEach(row =>
    row.forEach(node => {
      if (node.row === startNode.row && node.column === startNode.column) {
        node.distance = 0;
      } else node.distance = Infinity;
      node.prevNode = null;
    })
  );
  pq.queue(grid[startNode.row][startNode.column]);
  while (pq.length) {
    const node = pq.dequeue();
    const { row, column } = node;
    // console.log("[Grid]  " + Object.keys(grid[1][1]) + "row column = " + row + column );
    if (grid[row][column].isVisited) continue;
    grid[row][column].isVisited = true;
    visitedNodes.push(node);
    //if (node.distance === Infinity) break;
    const n = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1]
    ];
    //with diag
    if (allowDiag) n.push([-1, 1], [1, 1], [-1, -1], [1, -1]);
    for (let j = 0; j < n.length; j++) {
      const i = n[j];
      const r = row + i[0];
      const c = column + i[1];
      if (
        grid[r] &&
        grid[r][c] &&
        !grid[r][c].isVisited &&
        (!grid[r][c].isWall || (r === finishNode.row && c === finishNode.column))
      ) {
        if (r === finishNode.row && c === finishNode.column) {
          grid[r][c].isVisited = true;
          grid[r][c].prevNode = grid[row][column];
          shortestPath = getShortestPath(grid[r][c]);
          return { visitedNodes, shortestPath };
        }
        const dist = Math.abs(i[0]) === 1 && Math.abs(i[1]) === 1 ? 1.4 : 1;
        if (node.distance + dist < grid[r][c].distance) {
          grid[r][c].prevNode = node;
          grid[r][c].distance = node.distance + dist;
        }
        pq.queue(grid[r][c]);
      }
    }
  }
  return { visitedNodes, shortestPath };
};

const getShortestPath = node => {
  let shortestPath = [];
  while (node !== null) {
    shortestPath.unshift(node);
    node = node.prevNode;
    if (node) node.isShortestPath = true;
  }
  return shortestPath;
};

export default dijkstra;
