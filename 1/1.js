const fs = require('fs');

const data = fs.readFileSync('./1/data.txt', 'utf-8').split(/\r?\n/);

let count = 0;
let previous;
for (num of data) {
	if (previous && Number(num) > previous) {
		count++;
	}
	previous = num;
}

console.log(count);
