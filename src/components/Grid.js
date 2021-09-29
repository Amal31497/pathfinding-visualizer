import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Node from "./Node";
import { dijkstra, findShortestPathDijkstra } from "../algorithms/BFSAndDijkstra.js";
import { DFS, findShortestPathDFS } from "../algorithms/DFS.js";
import { AStar, findAStarShortestPath } from "../algorithms/AStar.js";
import "./Grid.css";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


let START_NODE_ROW = 10;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 17;
let FINISH_NODE_COL = 30;


function Grid() {

    const [grid, setGrid] = useState([]);
    const [pickedAlgorithm, setPickedAlgorithm] = useState("");
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [algoNotSelected, setAlgoNotSelected] = useState(false);
    const [vizualizerInitiated, setVizualizerInitiated] = useState(false);

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

    function toggleSelectAlgoPopover(){
        setAlgoNotSelected(true);
        setTimeout(() => {
            setAlgoNotSelected(false);
        },2000)
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




    function generateRandomMaze(number){
        clearBoard();
        let randomMazeNodes = [];

        for(let i = 0; i < number; i++){
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
        clearBoard();
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
        clearBoard();
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
        setVizualizerInitiated(true);
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

        setTimeout(() => {
            setVizualizerInitiated(false);
        }, visitedNodes.length * 9)
        
    }
    
    function animateDijkstra(){
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInorder = dijkstra(grid,startNode,finishNode);
        const shortestPathDijkstra = findShortestPathDijkstra(finishNode);

        for(let node = 0; node < visitedNodesInorder.length; node++){
            setTimeout(() => {
                if(!visitedNodesInorder[node].isStart && !visitedNodesInorder[node].isFinish){
                    document.getElementById(`node-${visitedNodesInorder[node].row}-${visitedNodesInorder[node].col}`).classList.add("node-visited")
                }
            }, node * 4.5)
        }

        setTimeout(() => {
            animateShortestPath(shortestPathDijkstra);
        }, 4.5 * visitedNodesInorder.length)

        setTimeout(() => {
            setVizualizerInitiated(false);
        }, visitedNodesInorder.length * 9)
    }

    function clearBoard(){
        for(let row = 0; row < grid.length; row++){
            for(let col = 0; col < grid[0].length; col++){
                if(grid[row][col].isStart == false && grid[row][col].isFinish == false){
                    grid[row][col].isWall = false;
                    grid[row][col].isVisited = false;
                    document.getElementById(`node-${row}-${col}`).classList = "node";
                }
            }
        }
    }

    function animateDFS(){
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInorder = DFS(grid,startNode,finishNode);
        const shortestPath = findShortestPathDFS(finishNode);

        for(let node = 0; node < visitedNodesInorder.length; node++){
            setTimeout(() => {
                if(!visitedNodesInorder[node].isStart && !visitedNodesInorder[node].isFinish){
                    document.getElementById(`node-${visitedNodesInorder[node].row}-${visitedNodesInorder[node].col}`).classList.add("node-visited")
                }
            }, node * 4.5)
        }

        setTimeout(() => {
            animateShortestPath(shortestPath);
        }, visitedNodesInorder.length * 0.8)
    }

    return (
        <div className="grid" onMouseDown={() => setMouseIsPressed(true)} onMouseUp={() => setMouseIsPressed(false)}>
            <div className="secondTierNavigation">
                <Dropdown className="secondTierNavigationSingleActionButton">
                    <Dropdown.Toggle className="secondTierNavigationDropDownButton">
                        Draw Maze
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropDownModal">
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={generateRandomVerticalMaze}>Vertical Maze</button></Dropdown.Item>
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={generateRandomHorizontalMaze}>Horizontal Maze</button></Dropdown.Item>
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={() => generateRandomMaze(100)}>Random Maze(100)</button></Dropdown.Item>
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={() => generateRandomMaze(200)}>Random Maze(200)</button></Dropdown.Item>
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={() => generateRandomMaze(300)}>Random Maze(300)</button></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


                <button className="secondTierNavigationSingleActionButton"
                    onClick={pickedAlgorithm == "dijkstra" ?
                        animateDijkstra : pickedAlgorithm == "A Star" ?
                            animateAStar : pickedAlgorithm == "DFS" ?
                                animateDFS : toggleSelectAlgoPopover}>
                    Visualize
                    {vizualizerInitiated == true ?
                        <span><AiOutlineLoading3Quarters className="vizualizerInitiated" size={20} /></span>
                        :
                        null
                    }
                </button>

              
                <button className="secondTierNavigationSingleActionButton" onClick={clearBoard}>Clear Board</button>
                <Dropdown className="secondTierNavigationSingleActionButton">
                    <Dropdown.Toggle className="secondTierNavigationDropDownButton">
                        {pickedAlgorithm !== "" ? pickedAlgorithm : "Select Algorithm"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropDownModal">
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={() => setPickedAlgorithm("dijkstra")}>Dijkstra</button></Dropdown.Item>
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={() => setPickedAlgorithm("A Star")}>A*</button></Dropdown.Item>
                        <Dropdown.Item className="dropdownItem"><button className="dropDownModalButton" onClick={() => setPickedAlgorithm("DFS")}>Depth First Search</button></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <div style={{display:"flex"}}>
                    <div className="node node-start"></div>
                    <p style={{marginLeft:"10px", fontWeight:"700"}}> - Start</p>
                </div>
                <div style={{display:"flex"}}>
                    <div className="node node-finish"></div>
                    <p style={{marginLeft:"10px", fontWeight:"700"}}> - Target</p>
                </div>
                <div style={{display:"flex"}}>
                    <div className="node node-visited"></div>
                    <p style={{marginLeft:"10px", fontWeight:"700"}}> - Visited Node</p>
                </div>
                <div style={{display:"flex"}}>
                    <div className="node node-wall"></div>
                    <p style={{marginLeft:"10px", fontWeight:"700"}}> - Wall</p>
                </div>
                <div style={{display:"flex"}}>
                    <div className="node shortest-path"></div>
                    <p style={{marginLeft:"10px", fontWeight:"700"}}> - Shortest Path</p>
                </div>
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
                                    mouseIsPressed={mouseIsPressed}
                                />
                            )
                        })}
                    </div>
                )
            })}
            {algoNotSelected == true ?
                <p className="noAlgoSelectedToolTip">Please select an algorithm first!</p>
                :
                null
            }
        </div>
    )
}

export default Grid;