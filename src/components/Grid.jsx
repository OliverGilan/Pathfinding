import React from 'react';
import '../App.css';
import Node from './Node'
import {bfs} from '../algorithms/bfs'
import {evaluate} from '../algorithms/evaluate'
import {climb} from '../algorithms/hillclimb'
import {generateVal} from '../algorithms/generateVal'
import {shortestPath} from '../algorithms/shortestpath'
import {astar} from '../algorithms/astar'
import {genetic} from '../algorithms/genetic'
var now = require("performance-now")

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
        this.updateState = this.updateState.bind(this)
        this.animateGenetics = this.animateGenetics.bind(this)
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
        // document.getElementById(`eval-btn`).style.display = 'none'
        // document.getElementById(`optimize-btn`).style.display = 'block'
    }

    animateClimb = (newK, changedNodes, performance) => {
        document.getElementById(`k-value`).innerText = `k = ${newK}`
        document.getElementById(`time-value`).innerText = `time = ${performance}ms`
        document.getElementById(`time-value`).style.display = `block`
 
        for(let i = 0; i <= changedNodes.length; i++){
            if(i===changedNodes.length){
                setTimeout(() => {
                    this.evaluate()
                    // document.getElementById('spf-btn').style.display = 'block';
                    // document.getElementById('astar-btn').style.display = 'block';
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

    updateState = (changedNodes) => {
        var grid = this.state.grid

        for(let i = 0; i < changedNodes.length; i++){
            const node = changedNodes[i]
            grid[node.row][node.col].val = node.val
            grid[node.row][node.col].depth = node.depth
        }

        this.setState({grid})
        
    }

    optimize = () => {
        const iter = prompt("Iteration count?")
        var currK = this.state.k

        // this.clean()
        var t0 = now()
        var res = climb(this.state.grid, this.state.n, iter, currK)
        var t1 = now()
        var newK = res[0]
        var changedNodes = res[1]
        this.updateState(changedNodes)
        this.animateClimb(newK, changedNodes, t1-t0)
    }

    animateGenetics = (results) => {
        this.setState({grid: results[1], k: results[0]})
        document.getElementById(`k-value`).innerText = `k = ${results[0]}`
        // document.getElementById(`time-value`).innerText = `time = ${performance}ms`
        // document.getElementById(`time-value`).style.display = `block`
        for(let i = 0; i < this.state.n; i++){
            for(let j = 0; j < this.state.n; j++){
                setTimeout(() => {
                    const node = this.state.grid[i][j]
                    document.getElementById(`node-${node.row}-${node.col}`).className ='node node-optimized'
                    document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth
                    document.getElementById(`val-${node.row}-${node.col}`).innerText = node.val;
                }, 10 * i)
            }
        }
    }

    optimizeGenetics = () => {
        const {grid, n, k} = this.state

        var results = genetic(grid, n, k, 100)
        if(results[0] === -1){
            alert("Genetic algorithm produced worse grid (devolution?) and was discarded")
            return
        }
        this.animateGenetics(results)
    }

    animateSPF = (visitedNodes) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            setTimeout(() => {
              const node = visitedNodes[i];
              if (node !== undefined && node.isPath){
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-spf-path';
                document.getElementById(`depth-${node.row}-${node.col}`).className = "depthVisited";
                document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth;
              }else if (node !== undefined){
                document.getElementById(`depth-${node.row}-${node.col}`).className = "depthVisited";
                document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth;
              }
            }, 10 * i);
        }
    }

    animateAstar = (visitedNodes) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            setTimeout(() => {
              const node = visitedNodes[i];
              if (node !== undefined && node.isPath){
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-astar-path';
                document.getElementById(`depth-${node.row}-${node.col}`).className = "depthVisited";
                document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth;
              }else if (node !== undefined){
                document.getElementById(`depth-${node.row}-${node.col}`).className = "depthVisited";
                document.getElementById(`depth-${node.row}-${node.col}`).innerText = node.depth;
              }
            }, 10 * i);
        }
    }

    spf = () => {
        const {grid, n} = this.state
        console.time('spf')
        const visitedNodes = shortestPath(grid, n)
        console.timeEnd('spf')
        this.animateSPF(visitedNodes)
    }

    runastar = () => {
        const {grid, n} = this.state
        console.time('astar')
        const visitedNodes = astar(grid, n)
        console.timeEnd('astar')
        this.animateAstar(visitedNodes)
    }

    render(){
        const grid = this.state.grid
        return (
            <div className="board" style={{marginBottom: 25}}>
                <h1>{this.state.n}x{this.state.n}</h1>
                <h4 id="k-value" style={{display:"none"}}>.</h4>
                <h4 id="time-value" style={{display:"none"}}>.</h4>
                <button id="eval-btn" onClick={this.evaluate}>Evaluate</button>
                <button id="optimize-btn" onClick={this.optimize} >Optimize w/ Hill Climbing</button>
                <button id="genetic-btn" onClick={this.optimizeGenetics} >Optimize w/ Genetic algorithms</button>
                <button id="spf-btn" onClick={this.spf} >Solve w/ SPF</button>
                <button id="astar-btn" onClick={this.runastar} >Solve w/ A*</button>
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
