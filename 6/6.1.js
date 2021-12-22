const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(',');


let fish = data.map(Number);



for (let day = 1; day <= 150; day++) {
	const numNewFish = fish.filter(f => f == 0).length
	fish = fish.map(f => f === 0 ? 6 : f - 1);
	fish = fish.concat(Array(numNewFish).fill(8));
}


console.log(fish.length);