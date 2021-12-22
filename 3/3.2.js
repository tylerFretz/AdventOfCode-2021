const fs = require('fs');

const data = fs.readFileSync('./3/data.txt', 'utf-8').split(/\r?\n/);
const data2 = data.map(line => line.split(''));
let bitsByIndex = [];
let i = 0;

while (i < data2[0].length) {
	bitsByIndex = [...bitsByIndex, data2.map(v => v[i])];
	i++;
}

bitsByIndex.forEach(arr => arr.sort((a, b) => a - b));

let mcbArr = [];
for (arr of bitsByIndex) {
	const i = arr.indexOf('1');
	mcbArr.push(i > (arr.length / 2) ? 0 : 1);
}

const mcb = mcbArr.join('');
const lcb = mcbArr.map(v => (v === 0) ? 1 : 0).join('');
console.log(mcb);
console.log(lcb);

let dataCpy = data.concat();
for (let i = 0; i < mcb.length; i++) {
	if (dataCpy.length === 1) break;
	
	dataCpy = dataCpy.filter(val => val.charAt(i) === mcb.charAt(i));
	console.log(mcb);
	console.log(dataCpy);
}
console.log('final 1:' + dataCpy);

let dataCpy2 = data.concat();
for (let i = 0; i < lcb.length; i++) {
	if (dataCpy2.length === 1) break;
	
	dataCpy2 = dataCpy2.filter(val => val.charAt(i) === lcb.charAt(i));
	console.log(lcb);
	console.log(dataCpy2);
}

console.log('final2:' + dataCpy2);

const ogRating = parseInt(dataCpy[0], 2);
const CORating = parseInt(dataCpy2[0], 2);

console.log(ogRating);
console.log(CORating);

console.log(ogRating * CORating);