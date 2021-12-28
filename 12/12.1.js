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

const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

const getOccurances = (visitedNodes) => {
	let occurances = [];

	for (const v of visitedNodes) {
		const frequency = countOccurrences(visitedNodes, v);
		occurances.push({ name: v, frequency })
	}
	return occurances;
};

const graph = constructGraph(input);
console.log(graph);

let allPaths = [];
let visited = [];

const getPaths = (startNode, startNodeList, endNode) => {
	// base case. If a complete path has been formed, save path and return
	if (startNode === endNode) {
		visited.push(endNode);
		allPaths = [...allPaths, [...visited]];
		visited.pop();
		return;
	}

	visited.push(startNode);

	const visitedLowercase = visited.filter(v => v.toLowerCase() === v);

	let occurances = [];

	for (const val of visited) {
		const frequency = visitedLowercase.reduce((a, v) => (v === val ? a + 1 : a), 0);
		if (!occurances.some(occ => occ.name === val)) {
			occurances.push({ name: val, frequency })
		}
	}

	const startNodeVisitedOccurance = occurances.find(o => o.name === startNode) ?? 0;

	// see if a lowercase vertex has been visited three times
	if (startNode.toLowerCase() === startNode && startNodeVisitedOccurance?.frequency === 3) {
		visited.pop();
		return;
	}

	// see if 2 lowercase verticies have both been visited twice
	const twiceVisited = occurances.filter(oc => oc.frequency === 2);
	if (startNode.toLowerCase() === startNode && twiceVisited.length > 1) {
		return;
	}

	// if there are no possible nodes to travel to, backtrack
	if (startNodeList.filter(v => !visited.includes(v) || v.toUpperCase() === v).length === 0) {
		visited.pop();
		return;
	}

	for (const adj of startNodeList) {
		const freq = occurances.find(occ => occ.name === adj)?.frequency ?? 0;
		if (!visited.includes(adj) || adj.toUpperCase() === adj || freq < 2) {
			getPaths(adj, graph.get(adj), endNode, visited);

			visited = visited.filter(v => v !== adj);
		}
	}
	visited = visited.filter(v => v !== startNode);
}

getPaths('start', graph.get('start'),'end');

console.log(allPaths);

console.log(allPaths.length);