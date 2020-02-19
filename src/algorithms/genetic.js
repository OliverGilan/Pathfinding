import {clean} from './clean'
import {generateVal} from './generateVal'
import {evaluate} from './evaluate'
import {bfs} from './bfs'
import pq from 'js-priority-queue'

export function genetic(original, n, k, iterations) {
    clean(original)

    var grid = original.map((row,i) => {
        return row.map((cell, j) => (
            cell
        ))
    })

    var comparator = function(a,b){ return a.k - b.k }
    var queue = new pq({comparator: comparator})


    var population = generatePopulation(100, grid, n)
    while(iterations > 0){
        iterations--
        population.forEach((gene)=>{
            queue.queue({g: gene, k: evalSolution(gene, n)})
        })
        var survived = []
        for(let i = 0; i < 10; i++){
            survived.push(queue.dequeue())
        }
        queue.clear()
        population = nextGeneration(survived, n)
    }    

    // console.log("generated pop")
    population.forEach((gene)=>{
        queue.queue({g: gene, k: evalSolution(gene, n)})
    })
    var bestChild = queue.dequeue()
    var bestGrid = bestChild.g
    var bestK = bestChild.k

    if(bestK < k){
        return [k, original]
    }else{
        return [bestK, bestGrid]
    }
}

export function nextGeneration(survived, n){
    var nextGen = survived.map((obj) => obj.g)
    for(let i = 0; i < 90; i++){
        var parent = Math.floor(Math.random()*9)

        var row = Math.floor(Math.random()*n)
        var col = Math.floor(Math.random()*n)
        var mutatedCell = generateVal(row, col, n)
        var child = survived[parent].g
        // console.log(child)
        child[row][col].val = mutatedCell
        nextGen.push(child)
    }
    return nextGen
}

export function evalSolution(gene, n){

    bfs(gene, n)
    var k = evaluate(gene, n)
    return k
}

const createNode = (col, row, n) => {
    return {
      col,
      row,
      isStart: row === 0 && col === 0,
      isFinish: row === n-1 && col === n-1,
      val: generateVal(col, row, n),
      depth: 0,
      isVisited: false,
      isWall: false,
      previousNode: null,
      isPath: false
    };
  };
  

export function generatePopulation(count, grid, n){
    var pop = [grid]
    for(let i = 0; i < 99; i++){
        var parent = grid

        var row = Math.floor(Math.random()*n)
        var col = Math.floor(Math.random()*n)
        var mutatedCell = generateVal(row, col, n)
        var child = parent
        child[row][col].val = mutatedCell
        pop.push(child)
    }
    // var pop = []
    // for(let i = 0; i < count; i++){

    //     var grid = getInitialGrid(n)
    //     pop.push(grid)
    //     // pop.push({string: string, k: -1})
    // }
    return pop
}
  
const getInitialGrid = (n) => {
    const grid = [];
    for (let row = 0; row < n; row++) {
      const currentRow = [];
      for (let col = 0; col < n; col++) {
        currentRow.push(createNode(col, row, n));
      }
      grid.push(currentRow);
    }
    return grid;
};