const path = require('path');
const fs = require('fs');


// get non-diagonal adjacent indicies
const getAdjacent = (x, y, maxDimensions = 100) => {
	let adj = [];
	if (x - 1 > -1) {
		adj.push({ x: x - 1, y })
	} 

	if (x + 1 < maxDimensions) {
		adj.push({ x: x + 1, y});
	}

	if (y - 1 > -1) {
		adj.push({ x, y: y - 1 });
	}

	if (y + 1 < maxDimensions) {
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
			pathLength: (row === 0 && column === 0) ? 0 : Number.MAX_VALUE	
		})));


// Dijkstra's 		
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

const buildFiveXFiveBoard = (data) => {
	let fiveXFive = [];

	// append 4 tiles horizontally
	for (const line of data) {
		let temp = [...line];
		for (let i = 1; i < 5; i++) {
			const newLine = line.map(point => (
				{
					...point,
					value: point.value + i > 9 ? (point.value - 9) + i : point.value + i,
					x: point.x + (i * 100),
					pathLength: Number.MAX_VALUE,
				}
			));

			temp = [...temp, ...newLine];
		}
		fiveXFive.push(temp);
	}

	let temp = [...fiveXFive];

	// append 4 rows by 5 columns vertically
	for (let i = 1; i < 5; i++) {
		for (const line of temp) {
			const newLine = line.map(point => (
				{
					...point,
					value: point.value + i > 9 ? (point.value - 9) + i : point.value + i,
					y: point.y + (i * 100),
					pathLength: Number.MAX_VALUE,
				}
			))
			fiveXFive.push(newLine);
		}
	}

	return fiveXFive;
}

const uniformCostSearch = (startNode, endNode, graph) => {
	let priorityQueue = [startNode];

	while (priorityQueue.length > 0) {
		priorityQueue.sort((a, b) => b.pathLength - a.pathLength);
		const root = priorityQueue.pop();
		root.visited = true;

		if (root.x === endNode.x && root.y === endNode.y) {
			return root;
		}

		const unvisitedAdjacent = getAdjacent(root.x, root.y, 500).map(adj => graph[adj.y][adj.x]).filter(node => node.visited === false);
						

		for (const node of unvisitedAdjacent) {
			let pathLength = root.pathLength + node.value;

			if (!priorityQueue.some(n => n.x === node.x && n.y === node.y)) {
				node.pathLength = pathLength;
				priorityQueue.push(node);
			} else {
				const queueNode = priorityQueue.find(n => n.x === node.x && n.y === node.y);
				if (queueNode.pathLength > pathLength) {
					priorityQueue = priorityQueue.filter(n => n.x !== node.x && n.y !== node.y);
					node.pathLength = pathLength;
					priorityQueue.push(node);
				}
			}
		}
	}
	console.log("End node not found");
	return -1;
}


const newBoard = buildFiveXFiveBoard(input);
const res = uniformCostSearch(newBoard[0][0], newBoard[499][499], newBoard);
console.log(res);

