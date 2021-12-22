const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/);

// transform input into 2d array. Ex --> coordinantes[0] = ['957', '596', '957', '182']
const coordinantes = input.map(quad => quad.split(/\s->\s/).flatMap(pair => pair.split(',').map(Number)));
const lineMap = new Map();

const insert = (x, y) => {
	if (lineMap.has(`${x}/${y}`)) {
		const prev = lineMap.get(`${x}/${y}`);
		lineMap.set(`${x}/${y}`, prev + 1);
	} else {
		lineMap.set(`${x}/${y}`, 1);
	}
}

// inserting values into map
for (group of coordinantes)  {

	// vertical and horizontal movement
	if (Number(group[0]) == Number(group[2]) || Number(group[1]) == Number(group[3])) {

		// horizontal movement
		if (group[0] !== group[2]) {
			const y = Number(group[1]);
			if (group[0] < group[2]) {
				for (let i = Number(group[0]); i <= Number(group[2]); i++) {
					insert(Number(i), Number(y));
				}
			}
			else {
				for (let i = Number(group[2]); i <= Number(group[0]); i++) {
					insert(Number(i), Number(y));
				}
			}
		} 

		// vertical movement
		else if (group[1] !== group[3]) {
			const x = Number(group[0]);
			if (group[1] < group[3]) {
				for (let i = Number(group[1]); i <= Number(group[3]); i++) {
					insert(Number(x), Number(i));
				}
			} else {
				for (let i = Number(group[3]); i <= Number(group[1]); i++) {
					insert(Number(x), Number(i));
				}
			}
		}
	} 
	// diagonal movement
	else {
		// difference of x1/x2 is always same as y1/y2
		let diff = Math.abs(group[0] - group[2]);

		// diagonal right
		if (group[0] < group[2]) {
			// diagonal right up
			if (group[1] < group[3]) {
				while (diff > -1) {
					insert(group[0] + diff, group[1] + diff);
					diff--;
				}
			}
			// diagonal right down 
			else {
				while (diff > -1) {
					insert(group[0] + diff, group[1] - diff);
					diff--;
				}
			}
		} 
		
		// diagonal left
		else {
			// diagonal left up
			if (group[1] < group[3]) {
				while (diff > -1) {
					insert(group[0] - diff, group[1] + diff);
					diff--;
				}
			}
			// diagonal left down
			else {
				while (diff > -1) {
					insert(group[0] - diff, group[1] - diff);
					diff--;
				}
			}

		}
	}
}

let overLaps = 0;
lineMap.forEach((v, k) => {
	if (v > 1) {
		overLaps++;
	}
})

console.log(overLaps);


