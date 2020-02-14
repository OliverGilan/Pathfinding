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
        // var result = this.generateGrid();
        // var cells = result[0]
        // var refs = result[1]
        // this.setState({
        //     cells: cells,
        //     refs: refs,
        //     loading: false
        // })
        const n = prompt("Enter grid size (5,7,9,11)")
        const grid = getInitialGrid(n);
        // console.log(grid)
        this.setState({grid, n});
    }

    animateBFS(visitedNodesInOrder){
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            // console.log(visitedNodesInOrder)
            setTimeout(() => {
              const node = visitedNodesInOrder[i];
              if (node !== undefined){
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
                document.getElementById(`depth-${node.row}-${node.col}`).className = "depthVisited";
                document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth;
              }
            }, 10 * i);
        }
    }

    evaluate = () => {
        const {grid, n} = this.state
        const visitedNodesInOrder = bfs(grid, n)
        // console.log("visited: " + JSON.stringify(visitedNodesInOrder))
        // console.log(grid)
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

    optimize = () => {
        const iter = prompt("Iteration count?")
        var currK = this.state.k

        var res = climb(this.state.grid, this.state.n, iter, currK)
        var newK = res[0]
        console.log(newK)
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
                            // return <Cell 
                            // key={j}
                            // row={row} 
                            // col={col} 
                            // val={val} 
                            // isStart={isStart}
                            // isFinish={isFinish}
                            // n={this.state.n} 
                            // className="cell" ref={ref[ref.length-1]}/>
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

// const generateVal = (col, row, n) => {
//     // const minimum_move = 1
//     const maximum_move = Math.max(n-1-row, row, n-1-col, col)
//     if(row===n/2 && col === n/2){
//         return Math.floor(Math.random() * ((n/2))) + 1
//     }else if(row === n-1 && col === n-1){
//         return 0
//     }else{
//         return Math.floor((Math.random() * maximum_move)) + 1
//     }
// }

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
  };
};

// const getRandomInt = (max) => {
//     return Math.floor(Math.random() * Math.floor(max));
// }