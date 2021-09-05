import React, { useState, useEffect } from "react";
import Node from "./Node";
import { BFS } from "../algorithms/BFS.js";
import "./Grid.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 18;
const FINISH_NODE_COL = 36;


function Grid() {

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

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
        let grid = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row))
            }
            grid.push(currentRow);
        }
        setGrid(grid);
    }

    useEffect(() => {
        getInitialGrid();
    },[])

    function visualizeBFS(){
        const visitedNodesInOrder = BFS(grid,START_NODE_ROW,START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);
        animateBFS(visitedNodesInOrder);
    }

    function animateBFS(levels){
        let visitedNodes = [];
        for(let level = 0; level < levels.length; level++){
            for(let node = 0; node < levels[level].length; node++){
                if(levels[level][node].isFinish) return findShortestPath(visitedNodes);
                visitedNodes.push(levels[level][node])
                setTimeout(() => {
                    if(!levels[level][node].isStart)
                    {
                        document.getElementById(`node-${levels[level][node].row}-${levels[level][node].col}`).classList.add("node-visited")
                    }
                }, 100 * level)
            }
        }
    }

    function findShortestPath(nodes){
        let shortestPath = [];
        let currentRow = START_NODE_ROW;
        let currentCol = START_NODE_COL;
        let currentNode = grid[currentRow][currentCol];
        shortestPath.push(currentNode);

        while(!currentNode.isFinish && (currentRow !== FINISH_NODE_ROW || currentCol !== FINISH_NODE_COL)){
            let neighbors = [grid[currentRow+1][currentCol], grid[currentRow-1][currentCol], grid[currentRow][currentCol+1], grid[currentRow][currentCol-1]]
            let currentSmallestTotalDistance = Infinity;
            let closestNode;
            neighbors.forEach(neighborNode => {
                if (!shortestPath.includes(neighborNode)) {
                    let currentDistance = Math.abs(neighborNode.row - FINISH_NODE_ROW) + Math.abs(neighborNode.col - FINISH_NODE_COL);
                    if (currentDistance < currentSmallestTotalDistance) {
                        currentSmallestTotalDistance = currentDistance;
                        closestNode = neighborNode;
                    }
                }
                
            })
            shortestPath.push(closestNode);
            currentRow = closestNode.row;
            currentCol = closestNode.col;
        }
        setTimeout(() => {
            animateShortestPath(shortestPath);
        }, nodes.length * 4.3)
        
    }


    function animateShortestPath(path){
        for(let i = 0; i < path.length; i++){
            setTimeout(() => {
                if(!path[i].isFinish && !path[i].isStart){
                    document.getElementById(`node-${path[i].row}-${path[i].col}`).classList.add("shortest-path");
                }          
            }, 30 * i)
        }
    }

    return (
        <div className="grid">
            <button onClick={visualizeBFS}>Visualize</button>
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} className="tableRow">
                        {row.map((node, nodeIdx) => {
                            const { row, col, isStart, isFinish, isWall, isVisited } = node;
                            return (
                                <Node
                                    key={nodeIdx}
                                    col={col}
                                    row={row}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isWall={isWall}
                                    isVisited={isVisited}
                                    grid={grid}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Grid;