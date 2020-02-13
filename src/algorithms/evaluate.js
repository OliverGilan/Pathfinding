
export function evaluate(grid, n) {
    const reachable = grid[n-1][n-1].isVisited ? true : false

    return reachable
}
