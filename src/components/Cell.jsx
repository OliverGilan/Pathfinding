import React from 'react';
import '../App.css';

export default class Cell extends React.Component {
    constructor(props){
        super(props);
        this.state={
            color: "none"
        }
    }

    isLast(){
        if(this.props.x === this.props.n-1 && this.props.y === this.props.n-1){
            return true
        }
    }

    updateColor = (color) => {
        this.setState({
            color: color
        })
    }

    render(){
        return (
            <div className="cell" style={{backgroundColor: this.state.color}}>
                <p >{this.props.val}</p>
            </div>
        );
    }
}
