import React, { useState } from "react";
import "./InfoModal.css";
import route from "./assets/route.png";
import mazeDropdown from "./assets/mazeDropdown.png";
import algoDropdown from "./assets/algoDropdown.png";

const InfoModal = () => {

    const [skipAnimation,setSkipAnimation] = useState("");
    const [skipAnimationDissapear, setSkipAnimationDissapear] = useState("");
    const [infoIcon, setInfoIcon] = useState("invisibleInfoIcon");
    const [slideNumber, setSlideNumber] = useState(1);

    function initiateGuideClose(event){
        event.preventDefault();
        // setSlideNumber(1);
        setSkipAnimation("skipAnimation");
        setSkipAnimationDissapear("dissapear");
        setInfoIcon("visibleInfoIcon");
    }

    function initiateGuideOpen(event){
        event.preventDefault();
        setSkipAnimation("skipAnimationBackwards");
        setSkipAnimationDissapear("dissapearBackwards");
        setInfoIcon("invisibleInfoIcon");
    }

    return(
        <div className={`infoModalWrapper ${skipAnimation}`}>
            {slideNumber == 1 &&
                <>
                    <p className={infoIcon} onClick={(event) => initiateGuideOpen(event)}>Info</p>
                    <img src={route} className={`infoModalImage ${skipAnimationDissapear}`} />
                    <h6 className={`infoModalHeader ${skipAnimationDissapear}`}>Pathifinding Visualizer</h6>
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`}>I created this visualizer to display popular pathfinding algorithms. If you'd like to learn how to use it just click on the <span id="guideMe">"Next"</span> button.</p>
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`}>Feel free to skip the tutorial by clicking on <span id="skip">"Skip"</span> button</p>
                </>
            }

            {slideNumber == 2 &&
                <>
                    <p className={infoIcon} onClick={(event) => initiateGuideOpen(event)}>Info</p>
                    <h6 className={`infoModalHeader ${skipAnimationDissapear}`} style={{marginTop:"30px",marginBottom:"48px"}}>Available Pathifinding Algorithms</h6>
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`}><span id="guideMe">Dijkstra </span> - Super famous algorithm, finds the shortest path by using breadth-first-search principles</p>
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`}><span id="guideMe">A-Star </span> - One of the most efficient pathfinding algorithms, guarantees the shortest path and accounts for heuristic distance (distance from the target)</p>
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`}><span id="guideMe">DFS(Depth-First-Search) </span> - Algorithm that performs search by visiting every posible path, does not return shortest path but still cool!</p>
                </>
            }

            {slideNumber == 3 &&
                <>
                    <p className={infoIcon} onClick={(event) => initiateGuideOpen(event)}>Info</p>
                    <h6 className={`infoModalHeader ${skipAnimationDissapear}`} style={{ marginTop: "15px", marginBottom: "15px" }}>How to use this vizualizer?</h6>
                    <div className={`infoModalTextComponent ${skipAnimationDissapear}`} style={{display:"flex", marginBottom:"15px"}}><div className="startNodeCircle" style={{marginLeft:"5px",marginRight:"auto", width:"5%"}}></div> - Start Node (This is where each of the algorihtms is going to start search)</div>
                    <div className={`infoModalTextComponent ${skipAnimationDissapear}`} style={{display:"flex", marginBottom:"15px"}}><div className="finishNodeAnimation" style={{marginLeft:"auto",marginRight:"auto"}}><div className="targetPoint"></div></div> - End Node (Each algorithm has a goal of finding this node.</div>
                    <div className={`infoModalTextComponent ${skipAnimationDissapear}`} style={{display:"flex", marginBottom:"15px"}}><div className="node node-visited visitedNodeDisplay" style={{marginLeft:"6px",marginRight:"auto", width:"7%"}}></div>  - Visited Node (Every search algotithm visits nodes in certain pattern to find the target one)</div>
                    <div className={`infoModalTextComponent ${skipAnimationDissapear}`} style={{display:"flex", marginBottom:"15px"}}><div className="node node-wall" style={{marginLeft:"6px",marginRight:"auto", width:"7%"}}></div>  - Wall (Walls are impenetrable and hence do not count as visited node but rather as obstacles)</div>
                    <div className={`infoModalTextComponent ${skipAnimationDissapear}`} style={{display:"flex", marginBottom:"15px"}}><div className="node shortest-path shortestPathDisplay" style={{marginLeft:"6px",marginRight:"auto", width:"7%"}}></div>  - Shortest Path Node (After search is complete an algorithm will return the shortest path)</div>  
                </>
            }

            {slideNumber == 4 &&
                <>
                    <p className={infoIcon} onClick={(event) => initiateGuideOpen(event)}>Info</p>
                    <h6 className={`infoModalHeader ${skipAnimationDissapear}`}>Drawing Walls, Generating Mazes and Algorithms</h6>
                    <img src={mazeDropdown} className={`infoModalImage ${skipAnimationDissapear}`} />
                    <img src={algoDropdown} className={`infoModalImage ${skipAnimationDissapear}`} />
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`}>To select a particular maze click on the "Draw Maze" dropdown and select desired maze</p>
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`}>To select a particular algorithm click on the "Select Algorithm" dropdown and select desired algorithm</p>
                    <p className={`infoModalTextComponent ${skipAnimationDissapear}`} style={{marginBottom:"-40px"}}>Click, hold and drag to draw customized walls</p>
                </>
            }

            <div className={`infoModalNavigationButtons ${skipAnimationDissapear}`}>
                <button onClick={(event) => initiateGuideClose(event)} type="button" class="btn btn-danger">Skip</button>
                {slideNumber > 1 && <button type="button" class="btn btn-info smallerWidthButton" onClick={() => setSlideNumber(slideNumber-1)}>Back</button>}
                {slideNumber > 1 ? <button type="button" class="btn btn-success smallerWidthButton" onClick={() => slideNumber === 4 ? setSlideNumber(1) : setSlideNumber(slideNumber+1)}>Next</button>
                :
                <button type="button" class="btn btn-success" onClick={() => setSlideNumber(slideNumber+1)}>Next</button>
                }
            </div>

        </div>
    )
}

export default InfoModal;