export function DFS(grid, startNode, finishNode){
    startNode.isVisited = false;
    let stack = [startNode];
    let visitedNodes = [];
    while(stack.length > 0){
        let currentNode = stack.pop();
        
        if(currentNode.isWall == true) continue;
        if(currentNode.isVisited == true && visitedNodes.includes(currentNode)) continue;
        if(currentNode == finishNode){
            return visitedNodes;
        } 
        
        currentNode.isVisited = true;
        visitedNodes.push(currentNode);

        let neighbors = getUnvisitedNeighbors(currentNode, grid);
        
        neighbors.forEach(neighbor => {
            if(!visitedNodes.includes(neighbor)){
                neighbor.previousNode = currentNode;
                stack.push(neighbor);
            }
        })
    }
    return visitedNodes;
}   

export function findShortestPathDFS(finishNode) {
    let currentNode = finishNode;

    let path = [];
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
}


function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); 
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
}