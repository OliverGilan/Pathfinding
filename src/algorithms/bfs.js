
export function bfs(grid, n) {
    const visitedNodesInOrder = [];
    // const visited = grid.map((row) => row)
    // const depth = grid.map((row) => row)
    
    var queue=[{r: 0, c: 0, d: 0}]
    grid.forEach((row, i) => {
        row.forEach((node, j) => {
            node.isVisited = false
        })
    })

    while(queue.length){
        var coord = queue.shift()
        const {r, c, d} = coord

        if(grid[r][c].isVisited){continue}
        grid[r][c].isVisited = true
        grid[r][c].depth = d

        var node = grid[r][c]
        // console.log("node : " + JSON.stringify(node))
        visitedNodesInOrder.push(node)
        const jump = node.val

        if(r === n-1 && c === n-1){break}

        if(r + jump < n){
            queue.push({r: r+jump, c: c, d: d+1})
        }
        if(r - jump >= 0){
            queue.push({r: r-jump, c: c, d: d+1})
        }
        if(c + jump < n){
            queue.push({r: r, c: c + jump, d: d+1})
        }
        if(c - jump >= 0){
            queue.push({r: r, c: c - jump, d: d+1})
        }
    }

    // var reachable = visited[n-1][n-1] === -1 ? true : false

    // visitedNodesInOrder.forEach((node) => {
    //     grid[node.row][node.col].isVisited = false
    // })
    return visitedNodesInOrder
  }
  
//   function sortNodesByDistance(unvisitedNodes) {
//     unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
//   }
  
//   function updateUnvisitedNeighbors(node, grid) {
//     const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//     for (const neighbor of unvisitedNeighbors) {
//       neighbor.distance = node.distance + 1;
//       neighbor.previousNode = node;
//     }
//   }
  
//   function getUnvisitedNeighbors(node, grid) {
//     const neighbors = [];
//     const {col, row} = node;
//     if (row > 0) neighbors.push(grid[row - 1][col]);
//     if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//     if (col > 0) neighbors.push(grid[row][col - 1]);
//     if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//     return neighbors.filter(neighbor => !neighbor.isVisited);
//   }
  
//   function getAllNodes(grid) {
//     const nodes = [];
//     for (const row of grid) {
//       for (const node of row) {
//         nodes.push(node);
//       }
//     }
//     return nodes;
//   }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
//   export function getNodesInShortestPathOrder(finishNode) {
//     const nodesInShortestPathOrder = [];
//     let currentNode = finishNode;
//     while (currentNode !== null) {
//       nodesInShortestPathOrder.unshift(currentNode);
//       currentNode = currentNode.previousNode;
//     }
//     return nodesInShortestPathOrder;
//   }
  