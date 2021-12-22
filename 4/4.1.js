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
console.log(boards);

const getWinner = () => {
	for (num of draws) {
		boards = boards.map(board => board.map(line => line.map(n => n == num ? -1 : n)));

		for (b of boards) {
			for (line of b) {
				if (line.every(val => val == -1)) {
					return {
						winner: b,
						lastCalled: num
					};
				}
			}
			for (let i = 0; i < 5; i++) {
				if (b.every(line => line[i] == -1)) {
					return {
						winner: b,
						lastCalled: num
					};
				}
			}
		}
	}
}

const res = getWinner();

const winnerValue = res.winner.flatMap(line => line.filter(val => val !== -1)).reduce((prev, curr) => Number(prev) + Number(curr));

console.log(res);
console.log(winnerValue);
console.log(res.lastCalled);
console.log(winnerValue * res.lastCalled);