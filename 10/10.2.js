const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/)
	.map(line => line.split(''));

const openingBrackets = ['(', '[', '{', '<'];
const closingBrackets = [')', ']', '}', '>'];

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

const getIncompleteLines = (data) => {
	let incompleteLines = [];
	let stack = [];
	let isCorrupted = false;

	for (const line of data) {
		for (const c of line) {
			const i = openingBrackets.indexOf(c);
			if (openingBrackets.indexOf(c) !== -1) {
				stack.push(c);
			} else {
				if (isPair(stack[stack.length - 1], c)) {
					stack.pop();
				} else {
					isCorrupted = true;
					break;
				}
			}
		}
		if (isCorrupted === false) {
			incompleteLines.push(line);
		}
		stack = [];
		isCorrupted = false;
	}
	return incompleteLines;
}

const incompleteLines = getIncompleteLines(input);

const getLineEndBrackets = (line) => {
	let endBrackets = [];
	let stack = [];

	for (const c of line) {
		const i = openingBrackets.indexOf(c);
		if (openingBrackets.indexOf(c) !== -1) {
			stack.push(c);
		} else {
			if (isPair(stack[stack.length - 1], c)) {
				stack.pop();
			}
		}
	}
	stack = stack.reverse();

	for (const c of stack) {
		const i = openingBrackets.indexOf(c);
		endBrackets.push(closingBrackets[i]);
	}
	return endBrackets;
}

const getAllLineEndBrackets = (lines) => {
	let endBrackets = [];

	for (const line of lines) {
		endBrackets.push(getLineEndBrackets(line));
	}
	return endBrackets;
}

const endLineBrackets = getAllLineEndBrackets(incompleteLines);

const getLineScore = (line) => {
	let total = 0;

	for (const c of line) {
		total *= 5;
		if (c === ')') {
			total += 1;
		} else if (c === ']') {
			total += 2;
		} else if (c === '}') {
			total += 3;
		} else if (c === '>') {
			total += 4;
		}
	}

	return total;
}

const getAllScores = (endBrackets) => {
	let scores = [];

	for (const line of endBrackets) {
		scores.push(getLineScore(line));
	}

	return scores;
}

const scores = getAllScores(endLineBrackets);

const getMedian = (s) => {
	let sorted = s.sort((a, b) => a - b);

	while (sorted.length > 1) {
		sorted.pop();
		sorted.shift();
	}

	return sorted[0];
}

const median = getMedian(scores);

console.log(median);