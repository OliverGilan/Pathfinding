
export function bfs(grid, n) {
    const visitedNodesInOrder = [];
    const stack=[]

    var queue=[{r: 0, c: 0, d: 0, j: 0}]
    grid.forEach((row, i) => {
        row.forEach((node, j) => {
            node.isVisited = false
            node.isPath = false
            
        })
    })

    while(queue.length){
        var coord = queue.shift()
        const {r, c, d} = coord

        if(grid[r][c].isVisited){continue}
        stack.push(coord)
        grid[r][c].isVisited = true
        grid[r][c].depth = d

        var node = grid[r][c]
        visitedNodesInOrder.push(node)
        const jump = node.val

        if(r === n-1 && c === n-1){break}

        if(r + jump < n){
            queue.push({r: r+jump, c: c, d: d+1, j: jump})
        }
        if(r - jump >= 0){
            queue.push({r: r-jump, c: c, d: d+1, j: jump*-1})
        }
        if(c + jump < n){
            queue.push({r: r, c: c + jump, d: d+1, j: jump})
        }
        if(c - jump >= 0){
            queue.push({r: r, c: c - jump, d: d+1, j: jump*-1})
        }
    }

    var reachable = grid[n-1][n-1].isVisited ? true : false
    if(reachable){
        var step = stack.pop()
        grid[step.r][step.c].isPath = true
        var curr = step
        while(stack.length){
            curr = stack.pop()
            if(curr.d !== step.d-1){continue}
            if(curr.r===step.r && curr.c===step.c-step.j){
                grid[curr.r][curr.c].isPath = true
                step = curr
            }else if(curr.c===step.c && curr.r===step.r-step.j){
                grid[curr.r][curr.c].isPath = true
                step = curr
            }
        }
    }

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
  