import React, { useEffect, useState } from "react";
import "./Node.css";


export default function Node(props) {

    const [col, setCol] = useState();
    const [row, setRow] = useState();
    const [isFinish, setIsFinish] = useState();
    const [isStart, setIsStart] = useState();
    const [isWall, setIsWall] = useState();
    const [isVisited, setIsVisited] = useState();
    const [grid, setGrid] = useState();
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [startOrFinishNodeSelected, setStartOrFinishNodeSelected] = useState();

    useEffect(() => {
        setCol(props.col);
        setRow(props.row);
        setIsFinish(props.isFinish);
        setIsStart(props.isStart);
        setIsWall(props.isWall);
        setIsVisited(props.isVisited);
        setGrid(props.grid)
        setMouseIsPressed(props.mouseIsPressed);
        setStartOrFinishNodeSelected(false);

    }, [props.col, props.row, props.isFinish, props.isStart, props.isWall, props.isVisited, props.grid, props.mouseIsPressed, props.startRow, props.startCol, startOrFinishNodeSelected])

    let nodeClassName = "";

    if (isFinish) {
        nodeClassName = "node-finish"
    } else if (isStart) {
        nodeClassName = "node-start"
    } else if (isWall) {
        nodeClassName = "node-wall"
    } else if (isVisited) {
        nodeClassName = "node-visited"
    } else {
        nodeClassName = ""
    }

    // function findStartNode(grid){
    //     for(let row = 0; row < grid.length; row++){
    //         for(let col = 0; col < grid[0].length; col++){
    //             if(grid[row][col].isStart === true){
    //                 return grid[row][col];
    //             }
    //         }
    //     }
    // }

    function processEvent(event) {
        event.preventDefault();
        // console.log(event.target.className);
        if(event.target.className == "node node-start"){
            props.onSelectStart(true);
        } else if(event.target.className == "node node-finish"){
            props.onSelectFinish(true);
        } else {
            props.onSelectStart(false);
            props.onSelectFinish(false);
        }
    }

    function processEventRelease(event){
        event.preventDefault();
        props.onSelectStart(false);
        props.onSelectFinish(false);
    }

    function handleChangeStart(event, row, col) {
        event.preventDefault();
        
        grid[row][col].isStart = true;
        props.onChangeStart(grid, row, col);
    }

    function handleChangeFinish(event, row, col){
        event.preventDefault();

        grid[row][col].isFinish = true;
        props.onChangeFinish(grid, row, col);
    }

    function buildWall(event, row, col) {
        event.preventDefault();

        if(grid[row][col].isStart == false && grid[row][col].isFinish == false){
            grid[row][col].isWall = true;
            document.getElementById(`node-${row}-${col}`).className = "node node-wall"
        }
    }

    return (
        <div
            id={`node-${row}-${col}`}
            className={`node ${nodeClassName}`}
            onMouseEnter={(event) => mouseIsPressed && props.startNodeSelected == true && props.finishNodeSelected == false ? handleChangeStart(event, row, col) : mouseIsPressed && props.finishNodeSelected == true && props.startNodeSelected == false ? handleChangeFinish(event, row, col) : mouseIsPressed == true ? buildWall(event, row, col) : null}
            onMouseDown={(event) => processEvent(event)}
            onMouseUp={(event) => processEventRelease(event)}
        >
            {isFinish == true &&
                <div className="targetPoint"></div>
            }
            <div></div>
        </div>
    )
}