import React,{ useEffect, useState } from "react";
import Grid from "./Grid";
import "./Node.css";

export default function Node(props){


        const [col, setCol] = useState();
        const [row, setRow] = useState();
        const [isFinish, setIsFinish] = useState();
        const [isStart, setIsStart] = useState();
        const [isWall, setIsWall] = useState();
        const [isVisited, setIsVisited] = useState();
        const [grid, setGrid] = useState();
        const [mouseIsPressed, setMouseIsPressed] = useState(false);

        useEffect(() => {
            setCol(props.col);
            setRow(props.row);
            setIsFinish(props.isFinish);
            setIsStart(props.isStart);
            setIsWall(props.isWall);
            setIsVisited(props.isVisited);
            setGrid(props.grid)
            setMouseIsPressed(props.mouseIsPressed);
        },[props.col,props.row,props.isFinish,props.isStart,props.isWall,props.isVisited,props.grid,props.mouseIsPressed])

        let nodeClassName = "";

        if(isFinish){
            nodeClassName = "node-finish"
        } else if(isStart){
            nodeClassName = "node-start"
        } else if(isWall){
            nodeClassName = "node-wall"
        } else if(isVisited){
            nodeClassName = "node-visited"
        } else {
            nodeClassName = ""
        }

        function buildWall(event,row,col){
            event.preventDefault();

            if(grid[row][col].isStart == false && grid[row][col].isFinish == false){
                grid[row][col].isWall = true;
                document.getElementById(`node-${row}-${col}`).classList.add("node-wall");  
            }
        }

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${nodeClassName} `}
                onMouseEnter={(event) => mouseIsPressed ? buildWall(event, row, col) : null}
                onMouseDown={(event) => mouseIsPressed ? buildWall(event, row, col) : null}
                onMouseUp={() => setMouseIsPressed(false)}
            >
                    {isStart == true &&
                        <div className="startNodeCircle"></div>
                    }
                    {isFinish == true && 
                        <div className="finishNodeAnimation">
                            <div className="targetPoint"></div>
                        </div>
                    }  
                    <div></div>
            </div>
        )
}