
export function evaluate(grid, n) {
    const reachable = grid[n-1][n-1].isVisited ? true : false

    if(reachable){
        return grid[n-1][n-1].depth
    }else{
        var k = 0
        grid.forEach((row, i) => {
            row.forEach((node,j)=>{
                if(!grid[i][j].isVisited){
                    k = k + 1
                }
            })
        })
        return k = k * -1
    }
}
