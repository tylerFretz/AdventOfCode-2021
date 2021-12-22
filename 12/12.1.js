const path = require('path');
const fs = require('fs');

let input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/)
	.map(line => line.split('-'));


const constructGraph = (data) => {
	let vertices = new Map();

	for (const line of data) {
		// neither in map
		if (!vertices.has(line[0]) && !vertices.has(line[1])) {
			vertices.set(line[0], [line[1]]);
			vertices.set(line[1], [line[0]]);
		}

		// both already in map
		else if (vertices.has(line[0]) && vertices.has(line[1])) {
			const adjStart = vertices.get(line[0]);
			const adjEnd = vertices.get(line[1]);
			
			vertices.set(line[0], [...adjStart, line[1]]);
			vertices.set(line[1], [...adjEnd, line[0]]);
		}

		// start in map
		else if (vertices.has(line[0])) {
			const adjStart = vertices.get(line[0]);
			
			vertices.set(line[0], [...adjStart, line[1]]);
			vertices.set(line[1], [line[0]]);
		}

		// end in map
		else {
			const adjEnd = vertices.get(line[1]);

			vertices.set(line[0], [line[1]]);
			vertices.set(line[1], [...adjEnd, line[0]]);
		}
	}
	return vertices;
}

const graph = constructGraph(input);
console.log(graph);

const getAllPaths = (startNode, endNode) => {
	let visited = ['start'];
	const allPaths = [];

	for (const [node, adjacencyList] of graph) {
		if (node !== endNode) {
			visited = ['start'];
			let pathList = [startNode];
			allPaths.push(getPath(node, adjacencyList, endNode, visited));
		}
	} 

	return allPaths;
}

const getPath = (startNode, startNodeList, endNode, visited, path) => {
	if (startNode === endNode) {
		return path;
	}
	
	visited.push(startNode);

	for (const adj of startNodeList) {
		if (!visited.includes(adj) || adj.toUpperCase() === adj) {
			path.push(adj);
			getPath(adj, graph.get(adj), endNode, visited, path);

			path = path.filter(v => v !== adj);
		}
	}
	visited = visited.filter(v => v !== startNode);
}

const allPaths = getAllPaths('start', 'end');

console.log(allPaths);
