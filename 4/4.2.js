const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n\s*/);

const draws = input.splice(0, 1).flatMap(s => s.split(','));

const chunkArray = (arr, size) => {
	if (arr.length <= size) {
		return [arr];
	}
	return [arr.slice(0, size), ...chunkArray(arr.slice(size), size)];
}

let boards = chunkArray(input, 5).map(b => b.map(a => a.split(/\s{1,2}/)));

console.log(draws);

const getLoser = () => {
	for (num of draws) {

		boards = boards.map(board => board.map(line => line.map(n => n == num ? -1 : n)));
		for (b of boards) {
			for (line of b) {
				if (line.every(val => val == -1)) {
					if (boards.length === 1) {
						return {
							loser: boards[0],
							lastCalled: num
						}
					}
					boards = boards.filter(bo => bo !== b);
				}
			}
			for (let i = 0; i < 5; i++) {
				if (b.every(line => line[i] == -1)) {
					if (boards.length === 1) {
						return {
							loser: boards[0],
							lastCalled: num
						}
					}
					boards = boards.filter(bo => bo !== b);
				}
			}
		}
	}
}

const res = getLoser();

const loserValue = res.loser.flatMap(line => line.filter(val => val !== -1)).reduce((prev, curr) => Number(prev) + Number(curr));
console.log(res);
console.log(loserValue);
console.log(res.lastCalled * loserValue);