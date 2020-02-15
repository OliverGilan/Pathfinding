import {evaluate} from './evaluate'
import {generateVal} from './generateVal'
import {bfs} from './bfs'

export function climb(grid, n, count, k) {
    var optimizedNodes = []
    var currK = k
    var i
    for(i = 0; i < count; i++){
        var x = Math.floor(Math.random()*n)
        var y = Math.floor(Math.random()*n)
        if(x === n-1 && y === n-1){i--;continue}

        var oldVal = grid[x][y].val
        var newVal = generateVal(x,y,n)

        grid[x][y].val = newVal
        // console.log(grid[x][y].val)
        bfs(grid, n)
        var newK = evaluate(grid, n)
        // console.log("val " + newK)
        if(newK >= currK){
            currK = newK
            optimizedNodes.push(grid[x][y])
        }else{
            grid[x][y].val=oldVal
        }
    }
    return [currK, optimizedNodes]
}
