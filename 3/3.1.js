const fs = require('fs');

const data = fs.readFileSync('./3/data.txt', 'utf-8')
				.split(/\r?\n/)
				.map(line => line.split(''));

let bitsByIndex = [];
let i = 0;

while (i < data[0].length) {
	bitsByIndex = [...bitsByIndex, data.map(v => v[i])];
	i++;
}

bitsByIndex.forEach(arr => arr.sort((a, b) => a - b));

let mcb = [];
for (arr of bitsByIndex) {
	const i = arr.indexOf('1');
	mcb.push(i > (arr.length / 2) ? 0 : 1);
}

const g = mcb.join('');
const ep = mcb.map(v => (v === 0) ? 1 : 0).join('');

console.log(g);
console.log(ep);

const gamma = parseInt(g, 2);
const epsilion = parseInt(ep, 2);

console.log(gamma);
console.log(epsilion);

console.log(gamma * epsilion);

