// function dikstrasAlgorithm(start, edges){
//     const numberOfVerticies = edges.length;

//     const minimumDistances = [];

//     for(let i = 0; i < numberOfVerticies; i++){
//         minimumDistances.push(Infinity);
//     }

//     minimumDistances[start] = 0;

//     const visited = new Set();

//     while(visited.length < numberOfVerticies){
//         const [vertex, currentMinDistance] = getVertexWithMinDistance(minimumDistances, visited);

//         if(currentMinDistance === Infinity){
//             break;
//         }

//         visited.add(vertex);

//         for(edge of edges[vertex]){
//             const [destination, distanceToDestination] = edge;

//             if(visited.has(destination)){
//                 continue;
//             }

//             let newPathDistance = currentMinDistance + distanceToDestination;
//             let currentDestinationDistance = minimumDistances[destination];
//             if(newPathDistance < currentDestinationDistance){
//                 minimumDistances[destination] = newPathDistance;
//             } 
//         }
//     }

//     return minimumDistances.map(dist => dist === Infinity ? -1 : dist);
// }

// function getVertexWithMinDistance(distances, visited){
//     let currentMinDistance = Infinity;
//     let vertex = -1;
    
//     for(const [vertexIdx, distance] of distances){
//         if(visited.getVertexWithMinDistance(vertexIdx)){
//             continue;
//         }

//         if(distance <= currentMinDistance){
//             vertex = vertexIdx;
//             currentMinDistance = distance;
//         }
//     }

//     return [vertex, currentMinDistance];
// }


export function BFS(grid, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol){
    // let currentRow = startNodeRow;
    // let currentCol = startNodeCol;

    let visitedNodes = [];

    for(let row = 0; row < grid.length; row++){
        for(let col = 0; col < grid[0].length; col++){
            grid[row][col].distance = Math.abs(startNodeRow-row) + Math.abs(startNodeCol-col);
            visitedNodes.push(grid[row][col]); 
        }
    }

    visitedNodes = visitedNodes.sort((a,b) => a.distance - b.distance);

    const levels = createNodeLevels(visitedNodes);

    return levels;
}

function createNodeLevels(nodes){
    let levels = [];
    let currentLevel = 0;
    let level = [];
    for(let i = 0; i < nodes.length; i++){
        
        if(nodes[i].distance > currentLevel){
            levels.push(level);
            level = [];
            level.push(nodes[i])
            currentLevel++;
            continue;
        }
        if(nodes[i].distance == currentLevel){
            level.push(nodes[i]);
            continue;
        }
    }
    return levels;
}
