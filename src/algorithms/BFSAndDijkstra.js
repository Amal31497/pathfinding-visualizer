export function dijkstra(grid, startNode, finishNode) {

    const visitedNodesInorder = [];

    const unvisitedNodes = getNodes(grid);

    startNode.distance = 0;

    while (true) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);

        const closestNeighbor = unvisitedNodes.shift();

        if (closestNeighbor.isWall == true) continue;

        if (closestNeighbor.distance == Infinity) return visitedNodesInorder;

        closestNeighbor.isVisited = true;

        visitedNodesInorder.push(closestNeighbor);

        if (closestNeighbor.isFinish == true) return visitedNodesInorder;

        updatedUnvisitedNeighbors(closestNeighbor, grid);
    }
}

function updatedUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    const unvisitedNeighborsWithoutWalls = unvisitedNeighbors.filter(node => node.isWall == false)
    node.neighbors = unvisitedNeighborsWithoutWalls;
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getNodes(grid) {
    let nodes = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            grid[row][col].distance = Infinity;
            nodes.push(grid[row][col]);
        }
    }
    return nodes;
}

export function findShortestPathDijkstra(finishNode) {
    let currentNode = finishNode;

    let path = [];
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return path;
}


