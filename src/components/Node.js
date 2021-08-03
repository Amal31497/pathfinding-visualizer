import React from "react";
import "./Node.css";

export default class Node extends React.Component {
    render() {

        const {
            col,
            row,
            isFinish,
            isStart,
            isWall,
            // onMouseDown,
            // onMouseUp,
            // onMouseEnter
        } = this.props;

        const nodeClassName = isFinish
        ? "node-finish"
        : isStart
        ? "node-start"
        : isWall
        ? "node-wall"
        : "";

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${nodeClassName}`}
                // onMouseDown={() => onMouseDown(row, col)}
                // onMouseUp={() => onMouseUp()}
                // onMouseEnter={() => onMouseEnter(row, col)}
            ></div>
        )
    }
}