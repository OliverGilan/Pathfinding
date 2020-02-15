import React from 'react';
import '../App.css';
// import Cell from './Cell'
import Node from './Node'
import {bfs} from '../algorithms/bfs'
import {evaluate} from '../algorithms/evaluate'
import {climb} from '../algorithms/hillclimb'
import {generateVal} from '../algorithms/generateVal'

export default class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state={
            n: 0,
            loading: true,
            cells: null,
            refs: null,
            grid: [],
            k: 0
        }
        this.cellRef = []
    }

    componentDidMount(){
        const n = prompt("Enter grid size (5,7,9,11)")
        const grid = getInitialGrid(n);
        this.setState({grid, n});
    }

    animateBFS(visitedNodesInOrder){
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            setTimeout(() => {
              const node = visitedNodesInOrder[i];
              if (node !== undefined && node.isPath){
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
                document.getElementById(`depth-${node.row}-${node.col}`).className = "depthVisited";
                document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth;
              }else if (node !== undefined){
                document.getElementById(`depth-${node.row}-${node.col}`).className = "depthVisited";
                document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth;
              }
            }, 10 * i);
        }
    }

    evaluate = () => {
        const {grid, n} = this.state
        const visitedNodesInOrder = bfs(grid, n)

        this.animateBFS(visitedNodesInOrder)
        const k = evaluate(grid, n)
        this.setState({k});
        document.getElementById("k-value").innerText = `k = ${k}`
        document.getElementById(`k-value`).style.display = 'block'
        document.getElementById(`eval-btn`).style.display = 'none'
        document.getElementById(`optimize-btn`).style.display = 'block'
    }

    animateClimb = (newK, changedNodes) => {
        document.getElementById(`k-value`).innerText = `k = ${newK}`
 
        for(let i = 0; i <= changedNodes.length; i++){
            if(i===changedNodes.length){
                setTimeout(() => {
                    this.evaluate()
                }, 50 * i)
                continue
            }
            setTimeout(() => {
                const node = changedNodes[i];
                if (node !== undefined){
                    document.getElementById(`node-${node.row}-${node.col}`).className ='node node-optimized'
                    document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth
                    document.getElementById(`val-${node.row}-${node.col}`).innerText = node.val;
                }
            }, 10 * i)
        }
    }

    clean = () => {
        var grid = this.state.grid
        for(let i = 0; i < this.state.grid.length; i++){
            for(let j = 0; j < this.state.grid.length; j++){
                document.getElementById(`node-${i}-${j}`).className ='node'
                document.getElementById(`depth-${i}-${j}`).className = "depthCount"
                document.getElementById(`depth-${i}-${j}`).innerText = ""
                grid[i][j].isPath = false
                grid[i][j].isVisited=false
                grid[i][j].depth = 0
            }
        }
        this.setState({grid})
    }

    optimize = () => {
        const iter = prompt("Iteration count?")
        var currK = this.state.k

        this.clean()
        var res = climb(this.state.grid, this.state.n, iter, currK)
        var newK = res[0]
        var changedNodes = res[1]
        this.animateClimb(newK, changedNodes)
    }

    render(){
        // if(this.state.loading){
        //     return(<div>Loading</div>)
        // }
        const grid = this.state.grid
        return (
            <div className="board" style={{marginBottom: 25}}>
                <h1>{this.state.n}x{this.state.n}</h1>
                <h4 id="k-value" style={{display:"none"}}>.</h4>
                <button id="eval-btn" onClick={this.evaluate}>Evaluate</button>
                <button id="optimize-btn" onClick={this.optimize} style={{display:"none"}}>Optimize w/ Hill Climbing</button>
                {grid.map((row, i) => {
                    return <div className="row" key={i}>
                        {row.map((cell, j) => {
                            const {row, col, isStart, isFinish, val, depth} = cell
                            return(
                                <Node
                                    key={j}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    val={val}
                                    depth={depth}
                                    n={this.state.n} 
                                    row={row}></Node>
                            )
                    })} 
                    </div>
                })}
            </div>
        );
    }
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

const createNode = (col, row, n) => {
  return {
    col,
    row,
    isStart: row === 0 && col === 0,
    isFinish: row === n-1 && col === n-1,
    val: generateVal(col, row, n), //Change
    depth: 0,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isPath: false
  };
};
