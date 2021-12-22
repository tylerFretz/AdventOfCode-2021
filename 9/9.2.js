const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/)
	.map(line => line.split('').map(Number));


let lowPoints = [];
const lastIndex = data[0].length - 1;

for (let i = 0; i < data.length; i++) {
	// top row
	if (i === 0) {
		for (let k = 0; k <= lastIndex; k++) {
			//top left corner
			if (k === 0) {
				if (data[0][1] > data[0][0] && data[1][0] > data[0][0]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			}
			// top right corner
			else if (k === lastIndex) {
				if (data[0][k - 1] > data[0][k] && data[1][k] > data[0][k]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			} 
			// middle
			else {
				if (data[0][k-1] > data[0][k] && data[0][k+1] > data[0][k] && data[1][k] > data[0][k]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			}
		}
	} 
	// bottom row
	else if (i === data.length - 1) {
		for (let k = 0; k <= lastIndex; k++) {
			//bottom left corner
			if (k === 0) {
				if (data[i][1] > data[i][0] && data[i-1][0] > data[i][0]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			}
			// bottom right corner
			else if (k === lastIndex) {
				if (data[i][k - 1] > data[i][k] && data[i-1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			} 
			// middle
			else {
				if (data[i][k-1] > data[i][k] && data[i][k+1] > data[i][k] && data[i-1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			}
		}
	} 
	// middle rows
	else {
		for (let k = 0; k <= lastIndex; k++) {
			//left side
			if (k === 0) {
				if (data[i][1] > data[i][0] && data[i-1][0] > data[i][0] && data[i+1][0] > data[i][0]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			}
			// right side
			else if (k === lastIndex) {
				if (data[i][k-1] > data[i][k] && data[i-1][k] > data[i][k] && data[i+1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			} 
			// middle
			else {
				if (data[i][k-1] > data[i][k] && data[i][k+1] > data[i][k] && data[i-1][k] > data[i][k] && data[i+1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(`${i}-${k}`);
				}
			}
		}
	}
}

lowPoints = lowPoints.map(point => point.split('-').map(Number));

const visited = new Set();

const getRight = (row, col) => {
	if (col === lastIndex || data[row][col + 1] === 9 || data[row][col] === 9)
		return undefined;
	else	
		return `${row}-${col + 1}`;
}

const getLeft = (row, col) => {
	if (col === 0 || [row][col - 1] === 9 || data[row][col] === 9)
		return undefined; 
	else
		return `${row}-${col - 1}`;
}

const getBelow = (row, col) => {
	if (row === data.length - 1 || data[row + 1][col] === 9 || data[row][col] === 9)
		return undefined; 
	else 
		return `${row + 1}-${col}`;
}

const getAbove = (row, col) => {
	if (row === 0 || data[row - 1][col] === 9 || data[row][col] === 9)
		return undefined; 
	else
		return `${row - 1}-${col}`;
}

const getBasin = (row, col) => {
	let arr = [`${row}-${col}`];

	if (getRight(row, col) !== undefined  && !visited.has(`${row}-${col + 1}`)) {
		visited.add(`${row}-${col + 1}`);
		arr = arr.concat(getBasin(row, col + 1));
	}

	if (getLeft(row, col) !== undefined && !visited.has(`${row}-${col - 1}`)) {
		visited.add(`${row}-${col - 1}`);
		arr = arr.concat(getBasin(row, col - 1));
	}

	if (getAbove(row, col) !== undefined && !visited.has(`${row - 1}-${col}`)) {
		visited.add(`${row - 1}-${col}`);
		arr = arr.concat(getBasin(row - 1, col));
	}

	if (getBelow(row, col) !== undefined  && !visited.has(`${row + 1}-${col}`)) {
		visited.add(`${row + 1}-${col}`);
		arr = arr.concat(getBasin(row + 1, col));
	}
	return arr;
}

const getBasins = () => {
	let arr = [];
	for (const point of lowPoints) {
		arr.push(getBasin(point[0], point[1]));
	}
	return arr;
}

let result = getBasins();

result = result.sort((a, b) => b.length - a.length);

const answer = result[0].length * result[1].length * result[2].length

console.log(answer);


