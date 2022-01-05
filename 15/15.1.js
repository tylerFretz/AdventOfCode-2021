const path = require('path');
const fs = require('fs');

// grid is 100 X 100
// get non-diagonal adjacent indicies
const getAdjacent = (x, y) => {
	let adj = [];
	if (x - 1 > -1) {
		adj.push({ x: x - 1, y })
	} 

	if (x + 1 < 100) {
		adj.push({ x: x + 1, y});
	}

	if (y - 1 > -1) {
		adj.push({ x, y: y - 1 });
	}

	if (y + 1 < 100) {
		adj.push({ x, y: y + 1 });
	}

	return adj;
}

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/)
	.map((line, row) => line.split('')
	.map((value, column) => (
		{ 
			value: Number(value),
			visited: false,
			x: column,
			y: row,
			adjacent: getAdjacent(column, row),
			pathLength: (row === 0 && column === 0) ? 0 : Number.MAX_VALUE	
		})));

const getShortestPath = (endNode, graph) => {
	let priorityQueue = [];
	for (const row of graph) {
		for (const node of row) {
			priorityQueue.push(node);
		}
	}

	while (priorityQueue.length > 0) {
		priorityQueue.sort((a, b) => a.pathLength - b.pathLength);
		const root = priorityQueue.shift();
		root.visited = true;

		if (root.x === endNode.x && root.y === endNode.y) {
			return root;
		}

		const unvisitedAdjacent = getAdjacent(root.x, root.y).map(adj => graph[adj.y][adj.x]).filter(node => node.visited === false);
						

		for (const node of unvisitedAdjacent) {
			let temp = root.pathLength + node.value;
			if (temp < node.pathLength) {
				node.pathLength = temp;
			}
		}
	}
	console.log("Error");
	return -1;
}

// causes stack overflow for large graphs (ex => x > 75 && y > 75)
const getShortestPathRecursive = (startIndex, endIndex, graph, visited = []) => {
	// base case.
	if (startIndex.x === endIndex.x && startIndex.y === endIndex.y) {
		const node = graph[startIndex.y][startIndex.x];
		return node.pathLength;
	}

	// mark startIndex node as visited
	graph[startIndex.y][startIndex.x].visited = true;
	visited = [graph[startIndex.y][startIndex.x], ...visited];

	let nextNode;
	let minPath = Number.MAX_VALUE;

	for (const node of visited) {
		const unvisitedAdjacent = getAdjacent(node.x, node.y)
								.map(adj => graph[adj.y][adj.x])
								.filter(node => node.visited === false);
		for (const adj of unvisitedAdjacent) {
			if (node.pathLength + adj.value < minPath) {
				nextNode = adj;
				minPath = node.pathLength + adj.value;
			} 
		}
	}

	graph[nextNode.y][nextNode.x].pathLength = minPath;
	return getShortestPathRecursive({ x: nextNode.x, y: nextNode.y }, endIndex, graph, visited);
}

const endIndex = { x: 99, y: 99 };
const result = getShortestPath(endIndex, input);
console.log(result);
