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
					lowPoints = lowPoints.concat(data[0][0]);
				}
			}
			// top right corner
			else if (k === lastIndex) {
				if (data[0][k - 1] > data[0][k] && data[1][k] > data[0][k]) {
					lowPoints = lowPoints.concat(data[0][k]);
				}
			} 
			// middle
			else {
				if (data[0][k-1] > data[0][k] && data[0][k+1] > data[0][k] && data[1][k] > data[0][k]) {
					lowPoints = lowPoints.concat(data[0][k]);
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
					lowPoints = lowPoints.concat(data[i][0]);
				}
			}
			// bottom right corner
			else if (k === lastIndex) {
				if (data[i][k - 1] > data[i][k] && data[i-1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(data[i][k]);
				}
			} 
			// middle
			else {
				if (data[i][k-1] > data[i][k] && data[i][k+1] > data[i][k] && data[i-1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(data[i][k]);
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
					lowPoints = lowPoints.concat(data[i][0]);
				}
			}
			// right side
			else if (k === lastIndex) {
				if (data[i][k-1] > data[i][k] && data[i-1][k] > data[i][k] && data[i+1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(data[i][k]);
				}
			} 
			// middle
			else {
				if (data[i][k-1] > data[i][k] && data[i][k+1] > data[i][k] && data[i-1][k] > data[i][k] && data[i+1][k] > data[i][k]) {
					lowPoints = lowPoints.concat(data[i][k]);
				}
			}
		}
	}
}

