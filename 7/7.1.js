const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(',')
	.map(Number);

let leastFuel = 0;
let totalFuel = 0;
let prevTotalFuel = 0;
for (let i = 0; i < 1000; i++) {
	for (const crab of data) {
		const movement = Math.abs(crab - i)
		for (let k = 1; k <= movement; k++) {
			totalFuel += k;
		}
	}
	if (totalFuel < prevTotalFuel) {
		leastFuel = totalFuel;
	}
	prevTotalFuel = totalFuel;
	console.log(totalFuel);
	totalFuel = 0;
}

console.log(leastFuel);
