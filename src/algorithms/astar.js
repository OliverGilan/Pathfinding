import {clean} from './clean'
import pq from 'js-priority-queue'

export function astar(grid, n) {
    const visitedNodesInOrder = [];
    const stack=[]

    var comparator = function(a,b){ return b.h - a.h }
    var queue = new pq({comparator: comparator})
    queue.queue({r: 0, c: 0, d: 0, j: 0, h: manhattan_distance({x: 0, y: 0},{x: n-1, y: n-1})})
    clean(grid)

    while(queue.length){
        var coord = queue.dequeue()
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
            queue.queue({r: r+jump, c: c, d: d+1, j: jump, h: manhattan_distance({x: r+jump, y: c},{x:n-1,y:n-1})})
        }
        if(r - jump >= 0){
            queue.queue({r: r-jump, c: c, d: d+1, j: jump*-1, h: manhattan_distance({x: r-jump, y: c},{x:n-1,y:n-1})})
        }
        if(c + jump < n){
            queue.queue({r: r, c: c + jump, d: d+1, j: jump, h: manhattan_distance({x: r, y: c+jump},{x:n-1,y:n-1})})
        }
        if(c - jump >= 0){
            queue.queue({r: r, c: c - jump, d: d+1, j: jump*-1, h: manhattan_distance({x: r, y: c-jump},{x:n-1,y:n-1})})
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

export function manhattan_distance(point1, point2){
    return Math.abs(point1.x-point2.x)+Math.abs(point1.y-point2.y)
}
