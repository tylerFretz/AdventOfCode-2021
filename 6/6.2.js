const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(',');


let fish = data.map(Number);

const fishByNum = new Map();

fishByNum.set(8, 0);
fishByNum.set(7, 0);
fishByNum.set(6, 0);
fishByNum.set(5, fish.filter(f => f == 5).length);
fishByNum.set(4, fish.filter(f => f == 4).length);
fishByNum.set(3, fish.filter(f => f == 3).length);
fishByNum.set(2, fish.filter(f => f == 2).length);
fishByNum.set(1, fish.filter(f => f == 1).length);
fishByNum.set(0, fish.filter(f => f == 0).length);

fishByNum.forEach((v, k) => console.log(`[${k}] = ${v}`));
console.log('+++++++++++++++++start+++++++++++++++++++');

for (let day = 1; day <= 256; day++) {
	const nextZeroFish = fishByNum.get(1);
	const newFish = fishByNum.get(0);

	for (let key = 1; key < 8; key++) {
		const fishPlus1 = fishByNum.get(key + 1);
		fishByNum.set(key, fishPlus1);
	}
	
	fishByNum.set(0, nextZeroFish);
	fishByNum.set(8, newFish);

	const sixFish = fishByNum.get(6);
	fishByNum.set(6, sixFish + newFish);
}

fishByNum.forEach((v, k) => console.log(`[${k}] = ${v}`));


let total = BigInt(0); 

for (const [key, value] of fishByNum.entries()) {
	total += BigInt(value)
}

console.log(total);