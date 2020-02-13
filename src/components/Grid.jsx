import React from 'react';
import '../App.css';
// import Cell from './Cell'
import Node from './Node'
import {bfs} from '../algorithms/bfs'

export default class Grid extends React.Component {
    constructor(props){
        super(props);
        this.state={
            n: 0,
            loading: true,
            cells: null,
            refs: null,
            grid: []
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
        console.log(grid)
        this.setState({grid, n});
    }

    // getRandomInt(max) {
    //     return Math.floor(Math.random() * Math.floor(max));
    // }

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
            }, 100 * i);
        }
    }

    // generateGrid(visitedNodesInOrder){
    //     var cells = []
    //     var refs = []
    //     var x
    //     var y
    //     for(x=0; x<this.state.n; x++){
    //         var row = []
    //         var ref = []
    //         for(y=0; y<this.state.n; y++){
    //             // row.append(<Cell x={x} y={y} />)
    //             var val = this.getRandomInt(1)
    //             ref.push(React.createRef())
    //             row.push(<Cell x={x} y={y} val={val} n={this.state.n} className="cell" ref={ref[ref.length-1]}/>)
    //         }
    //         cells.push(row)
    //         refs.push(ref)
    //     }
    //     return [cells, refs];
    // }

    evaluate = () => {
        const {grid, n} = this.state;
        const visitedNodesInOrder = bfs(grid, n);
        // console.log("visited: " + JSON.stringify(visitedNodesInOrder))
        // console.log("visited: " + JSON.stringify(grid))
        this.animateBFS(visitedNodesInOrder);
    }

    render(){
        // if(this.state.loading){
        //     return(<div>Loading</div>)
        // }
        const grid = this.state.grid
        return (
            <div className="board">
                <h1>{this.state.n}x{this.state.n}</h1>
                <button onClick={this.evaluate}>Evaluate</button>
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

const generateVal = (col, row, n) => {
    // const minimum_move = 1
    const maximum_move = Math.max(n-1-row, row, n-1-col, col)
    if(row===n/2 && col === n/2){
        return Math.floor(Math.random() * ((n/2))) + 1
    }else if(row === n-1 && col === n-1){
        return 0
    }else{
        return Math.floor((Math.random() * maximum_move)) + 1
    }
}

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
