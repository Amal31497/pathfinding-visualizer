export function AStar(grid, startNode, finishNode){
    startNode.distance = 0;
    startNode.f = 0;
    let open = [startNode];
    let closed = [];

    while(open.length > 0){
        open.sort((a,b) => a.f-b.f);

        let currentNode = open.shift();
        if(closed.includes(finishNode)) return closed;
        closed.push(currentNode);

        let neighbors = getUnvisitedNeighbors(currentNode, grid);
        for(const neighbor of neighbors){
            if(closed.includes(neighbor) || neighbor.isWall == true) continue;

            if(!open.includes(neighbor)){
                neighbor.distance = currentNode.distance + 1;
                neighbor.heuristic = Math.abs(finishNode.row - neighbor.row) + Math.abs(finishNode.col - neighbor.col);
                neighbor.f = neighbor.distance + neighbor.heuristic;
                neighbor.previousNode = currentNode;
                open.push(neighbor);
            } else {
                if(neighbor.distance > currentNode.distance + 1){
                    neighbor.distance = currentNode.distance + 1;
                    neighbor.f = neighbor.distance + neighbor.heuristic;
                    neighbor.previousNode = currentNode;
                    open.sort((a,b) => a.f-b.f);
                }
            }
        }
    }
    return closed;
}

export function findAStarShortestPath(finishNode){
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
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors;
}
