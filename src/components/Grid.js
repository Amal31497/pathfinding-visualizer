import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Node from "./Node";
import { dijkstra, findShortestPathDijkstra } from "../algorithms/BFSAndDijkstra.js";
import { AStar, findAStarShortestPath } from "../algorithms/AStar.js";
import "./Grid.css";

let START_NODE_ROW = 10;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 2;
let FINISH_NODE_COL = 40;


function Grid() {

    const [grid, setGrid] = useState([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row == START_NODE_ROW && col == START_NODE_COL,
            isFinish: row == FINISH_NODE_ROW && col == FINISH_NODE_COL,
            distance: Infinity,
            heuristic: Infinity,
            f:Infinity,
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



    function animateShortestPath(path){
        for(let i = 0; i < path.length; i++){
            setTimeout(() => {
                if(!path[i].isFinish && !path[i].isStart){
                    document.getElementById(`node-${path[i].row}-${path[i].col}`).classList.add("shortest-path");
                }          
            }, 30 * i)
        }
    }

    function animateDijkstra(){
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInorder = dijkstra(grid,startNode,finishNode);
        const shortestPathDijkstra = findShortestPathDijkstra(finishNode);
        visualizeDijkstra(visitedNodesInorder);

        setTimeout(() => {
            animateShortestPath(shortestPathDijkstra);
        }, 4.5 * visitedNodesInorder.length)
        
    }

    function visualizeDijkstra(nodes){
        for(let node = 0; node < nodes.length; node++){
            setTimeout(() => {
                if(!nodes[node].isStart && !nodes[node].isFinish){
                    document.getElementById(`node-${nodes[node].row}-${nodes[node].col}`).classList.add("node-visited")
                }
            }, node * 4)
        }
    }


    function generateRandomMaze(){

        let randomMazeNodes = [];

        for(let i = 0; i < 100; i++){
            let randomRow = Math.floor(Math.random() * 20);
            let randomCol = Math.floor(Math.random() * 50);

            if(grid[randomRow][randomCol].isStart == false 
                && grid[randomRow][randomCol].isFinish == false 
                && !randomMazeNodes.includes(grid[randomRow][randomCol])){
                    randomMazeNodes.push(grid[randomRow][randomCol]);
            }
        }

        for(let i = 0; i < randomMazeNodes.length; i++){
            setTimeout(() => {
                randomMazeNodes[i].isWall = true;
                document.getElementById(`node-${randomMazeNodes[i].row}-${randomMazeNodes[i].col}`).classList.add("node-wall");
            }, i * 5)
        }
    }


    function generateRandomVerticalMaze(){
        let walls = [];
        for(let node = 0; node < grid[0].length; node++){
            walls.push(grid[0][node]);
        }
        for(let node = 0; node < grid.length; node++){
            walls.push(grid[node][0]);
        }
        for(let node = 0; node < grid[0].length; node++){
            walls.push(grid[grid.length-1][node]);
        }
        for(let node = 0; node < grid.length; node++){
            walls.push(grid[node][grid[0].length-1]);
        }

        let innerMaze = [];

        for(let col = 2; col < grid[0].length;col+=3){
            let randomGap = Math.floor(Math.random()*20);
            let randomGap2 = Math.floor(Math.random()*20);
            let randomGap3 = Math.floor(Math.random()*20);

            for(let row = 1; row < grid.length-1;row++){
                if(row !== randomGap && row !== randomGap2 && row !== randomGap3 && !grid[row][col].isFinish && !grid[row][col].isStart){
                    innerMaze.push(grid[row][col]);
                }
            }
        }

        walls.forEach((node,index) => {
            setTimeout(() => {
                node.isWall = true;
                document.getElementById(`node-${node.row}-${node.col}`).classList.add("node-wall");
            }, 16*index)
        })

        innerMaze.forEach((node,index) => {
            setTimeout(() => {
                node.isWall = true;
                document.getElementById(`node-${node.row}-${node.col}`).classList.add("node-wall");
            }, 10*index)
        })
    }


    function generateRandomHorizontalMaze(){
        let walls = [];
        for(let node = 0; node < grid[0].length; node++){
            walls.push(grid[0][node]);
        }
        for(let node = 0; node < grid.length; node++){
            walls.push(grid[node][0]);
        }
        for(let node = 0; node < grid[0].length; node++){
            walls.push(grid[grid.length-1][node]);
        }
        for(let node = 0; node < grid.length; node++){
            walls.push(grid[node][grid[0].length-1]);
        }
        
        let innerMaze = [];

        for(let row = 2; row < grid.length-1;row+=3){
            let randomGap = Math.floor(Math.random()*20);
            let randomGap2 = Math.floor(Math.random()*20);
            let randomGap3 = Math.floor(Math.random()*20);

            for(let col = 1; col < grid[0].length;col++){
                if(col !== randomGap && col !== randomGap2 && col !== randomGap3 && !grid[row][col].isFinish && !grid[row][col].isStart){
                    innerMaze.push(grid[row][col]);
                }
            }
        }

        walls.forEach((node,index) => {
            setTimeout(() => {
                node.isWall = true;
                document.getElementById(`node-${node.row}-${node.col}`).classList.add("node-wall");
            }, 5*index)
        })

        setTimeout(() => {
            innerMaze.forEach((node,index) => {
                setTimeout(() => {
                    node.isWall = true;
                    document.getElementById(`node-${node.row}-${node.col}`).classList.add("node-wall");
                }, 10*index)
            })
        },walls.length *5)

    }

    function animateAStar(){
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = AStar(grid, startNode, finishNode);
        const shortestPath = findAStarShortestPath(finishNode);

        for(let i = 0; i < visitedNodes.length; i++){
            setTimeout(() => {
                if(!visitedNodes[i].isFinish && !visitedNodes[i].isStart){
                    document.getElementById(`node-${visitedNodes[i].row}-${visitedNodes[i].col}`).classList.add("node-visited");
                }          
            }, 4.5 * i)
        }

        setTimeout(() => {
            animateShortestPath(shortestPath);
        }, visitedNodes.length * 4.5)
        
    }


    return (
        <div className="grid">
            <div className="secondTierNavigation">
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Draw Maze
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><button onClick={generateRandomVerticalMaze}>Generate Vertical Maze</button></Dropdown.Item>
                        <Dropdown.Item><button onClick={generateRandomHorizontalMaze}>Generate Horizontal Maze</button></Dropdown.Item>
                        <Dropdown.Item><button onClick={generateRandomMaze}>Generate Random Maze</button></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Algorithm
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><button onClick={() => animateDijkstra("dijkstra")}>Visualize Dijkstra</button></Dropdown.Item>
                        <Dropdown.Item><button onClick={animateAStar}>Visualize A*</button></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
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
                                    // buildWall={buildWall(row,col)}
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