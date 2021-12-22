const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/)
	.map(line => line.split(''));

const openingBrackets = ['(', '[', '{', '<'];

const isPair = (open, close) => {
	if (open === '(' && close === ')') {
		return true;
	} else if (open === '[' && close === ']') {
		return true;
	} else if (open === '{' && close === '}') {
		return true;
	} else if (open === '<' && close === '>') {
		return true;
	}
	return false;
}

const getCorruptedChars = (data) => {
	let corruptedChars = [];
	let stack = [];

	for (const line of data) {
		for (const c of line) {
			const i = openingBrackets.indexOf(c);
			if (openingBrackets.indexOf(c) !== -1) {
				stack.push(c);
			} else {
				if (isPair(stack[stack.length - 1], c)) {
					stack.pop();
				} else {
					corruptedChars.push(c);
					break;
				}
			}
		}
		stack = [];
	}
	return corruptedChars;
}

const chars = getCorruptedChars(input);

const getTotal = (illegalChars) => {
	let total = 0;

	for (const c of illegalChars) {
		if (c === ')') {
			total += 3;
		} else if (c === ']') {
			total += 57;
		} else if (c === '}') {
			total += 1197
		} else if (c === '>') {
			total += 25137
		}
	}
	return total;
}

const res = getTotal(chars);

console.log(res);
