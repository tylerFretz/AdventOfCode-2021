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
			adjacent: getAdjacent(column, row),
			visited: false		
		})));

console.log(input[98][1]);

const findMinAdjacent = (unvisitedAdj) => {
	let minDistance = Number.MAX_VALUE;
	let minDistanceCoor = null;

	for (let i = 0; i < unvisitedAdj.length; i++) {
		const { x, y } = unvisitedAdj[i]; 

		if (input[y][x].value < minDistance) {
			minDistance = input[y][x].value;
			minDistanceCoor = { x, y };
		}
	}
	return minDistanceCoor;
}