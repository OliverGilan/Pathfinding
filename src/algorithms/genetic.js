import {clean} from './clean'
import pq from 'js-priority-queue'

export function genetic(grid, n) {
    clean(grid)

    var comparator = function(a,b){ return a.k - b.k }
    var queue = new pq({comparator: comparator})


    const population = generatePopulation(1000)
    population.forEach((solution)=>{
        queue.queue({s: solution, k: evalSolution(grid, n, solution)})
    })

    var survive = 50
    
}

export function evalSolution(grid, n, solution){
    var count = 0
    var cell = grid[0][0]
    for(let i = 0; i < solution.length; i++){
        var move = solution.charAt(i)
        if(isValidMove(cell.row, cell.col, cell.val, move, n)){
            count++
            switch(move){
                case 0:
                    cell = grid[cell.row - jump][cell.col]
                case 1:
                    cell = grid[cell.row + jump][cell.col]
                case 2:
                    cell = grid[cell.row][cell.col - jump]
                case 3:
                    cell = grid[cell.row][cell.col + jump]
            }
        }else{
            break
        }
    }
    return count
}

export function isValidMove(row, col, jump, move, n){
    switch(move){
        case 0:
            return row - jump >= 0
        case 1:
            return row + jump < n
        case 2:
            return col - jump >=0
        case 3:
            return col + jump < n
    }
}

export function generatePopulation(count){
    var pop = []
    for(let i = 0; i < count; i++){
        var string = ""
        var random = Math.floor(Math.random()*50)+1
        while(random){
            var move = Math.floor(Math.random()*4)
            string+=move.toString()
        }
        pop.push({string: string, k: -1})
    }
    return pop
}
  