import React from "react";
import Node from "./Node";
import "./Grid.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    };
};

const getInitialGrid = () => {
    const grid = [];
    for( let row = 0; row < 20; row++ ){
        const currentRow = [];
        for( let col = 0; col < 50; col++ ){
            currentRow.push(createNode(col, row))
        }
        grid.push(currentRow);
    }
    return grid;
}

class Grid extends React.Component {

    constructor(){
        super();
        this.state = {
            grid:[],
            mouseIsPressed: false
        }
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid})
    }

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className="tableRow">
                            {row.map((node, nodeIdx) => {
                                const { row, col, isStart, isFinish, isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        row={row}
                                        isStart={isStart}
                                        isFinsih={isFinish}
                                        isWall={isWall}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Grid;