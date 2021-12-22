const path = require('path');
const fs = require('fs');

let input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/)
	.map(line => line.split('').map(Number));

const getAdjacent = (x, y) => {
	// top left
	if (x === 0 && y === 0) {
		return [[x+1, y], [x, y+1], [x+1, y+1]];
	}
	// top right
	else if (x === 9 && y === 0) {
		return [[x-1, y], [x, y+1], [x-1, y+1]];
	}
	// bottom left
	else if (x === 0 && y === 9) {
		return [[x, y-1], [x+1, y-1], [x+1, y]];
	}
	// bottom right 
	else if (x === 9 && y === 9) {
		return [[x, y-1], [x-1, y-1], [x-1, y]];
	} else {
		// right side
		if (x === 0) {
			return [[x, y-1], [x, y+1], [x+1, y-1], [x+1, y], [x+1, y+1]];
		} 
		// left side
		else if (x === 9) {
			return [[x, y-1], [x, y+1], [x-1, y-1], [x-1, y], [x-1, y+1]];
		} 
		// top side
		else if (y === 0) {
			return [[x-1, y], [x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]];
		} 
		// bottom side
		else if (y === 9) {
			return [[x-1, y], [x+1, y], [x-1, y-1], [x, y-1], [x+1, y-1]];
		}
		// middle 
		else {
			return [
				[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y],
				[x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]
			];
		}
	}
}

const flashed = new Set();
let flashes = 0;

const flash = (x, y) => {
	flashed.add(`${x}-${y}`);
	flashes++;
	const adj = getAdjacent(x, y);

	for (const [xCor, yCor] of adj) {
		if (input[yCor][xCor] !== 10) {
			input[yCor][xCor]++;
		}

		if (input[yCor][xCor] === 10 && !flashed.has(`${xCor}-${yCor}`)) {
			flash(xCor, yCor);
		}
	}
}

const doHundredSteps = () => {
	for (let i = 0; i < 10000; i++) {
		for (let k = 0; k < input.length; k++) {
			for (let j = 0; j < input[k].length; j++) {
				if (input[k][j] !== 10) {
					input[k][j]++;
				}
			}
		}

		for (let k = 0; k < input.length; k++) {
			for (let j = 0; j < input[k].length; j++) {
				if (input[k][j] === 10 && !flashed.has(`${j}-${k}`)) {
					flash(j, k);
				}
			}
		}

		input = input.map(line => line.map(num => num === 10 ? 0 : num));

		if (input.every(line => line.every(num => num === 0))) {
			console.log(i+1);
		}

		flashed.clear();
	}
}


doHundredSteps();



console.log(flashes);