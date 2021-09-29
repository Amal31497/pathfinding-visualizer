export function DFS(grid, startNode, finishNode){

    let stack = [];
    let visitedNodes = [];
    visitedNodes.push(startNode);
    stack.push(startNode);

    while(stack.length > 0){
        let currentNode = stack.pop();
        if(currentNode == finishNode) return visitedNodes;
        let unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);

        unvisitedNeighbors.forEach(neighbor => {
            if(!visitedNodes.includes(neighbor)){
                stack.push(neighbor);
                visitedNodes.unshift(neighbor);
            }
        })
    }

    return visitedNodes;
}   

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    
    return neighbors.filter(neighbor => !neighbor.isVisited);
}