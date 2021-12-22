const fs = require('fs');

const data = fs.readFileSync('./1/data.txt', 'utf-8')
				.split(/\r?\n/)
				.map((val, i, arr) => Number(arr[i]) + Number(arr[i + 1]) + Number(arr[i + 2]));


let count = 0;
let previous;
for (num of data) {
	if (previous && Number(num) > previous) {
		count++;
	}
	previous = num;
}

console.log(count);
