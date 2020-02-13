import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      val,
    //   n,
      depth,
      row,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}>
            <p className="val">{val}</p>
            <p id={`depth-${row}-${col}`} className="depthCount">{depth}</p>
        </div>
    );
  }
}
