export function clean(grid){
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid.length; j++){
            document.getElementById(`node-${i}-${j}`).className ='node'
            document.getElementById(`depth-${i}-${j}`).className = "depthCount"
            document.getElementById(`depth-${i}-${j}`).innerText = ""
            grid[i][j].isPath = false
            grid[i][j].isVisited=false
            grid[i][j].depth = 0
        }
    }
}