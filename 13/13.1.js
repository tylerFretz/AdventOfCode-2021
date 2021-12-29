const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/);

// index of empty line between coordinantes and fold instructions
const seperator = input.findIndex(i => i === '');

// coordinantes 2D array. Coords are numbers with x = coord[0], y = coord[1]
const dotCoordinates = input.slice(0, seperator).map(pair => pair.split(',').map(Number));

//	fold instruction array. folds are a string. Ex -> 'x=655'
const foldInstructions = input.slice(seperator + 1).map(fold => fold.slice(fold.indexOf(' ', 5) + 1));

const remove2DArrDuplicates = (array) => {
	return Object.values(array.reduce((a, b) => (a[JSON.stringify(b)] = b,a), {}));
}

const foldLeft = (dots, foldPos) => {
	dots.sort((a, b) => a[0] - b[0]);
	const pivotIndex = dots.findIndex(dot => dot[0] > foldPos);
	
	const leftOfFold = dots.slice(0, pivotIndex);
	const rightOfFold = dots.splice(pivotIndex);
	const mirrored = rightOfFold.map(dot => [foldPos - (dot[0] - foldPos), dot[1]]);

	const merged = leftOfFold.concat(mirrored);
	const postFoldDots = remove2DArrDuplicates(merged);
	return postFoldDots;
}

const foldUp = (dots, foldPos) => {
	dots.sort((a, b) => a[1] - b[1]);
	const pivotIndex = dots.findIndex(dot => dot[1] > foldPos);

	const aboveFold = dots.slice(0, pivotIndex);
	const belowFold = dots.slice(pivotIndex);
	const mirrored = belowFold.map(dot => [dot[0], foldPos - (dot[1] - foldPos)]);

	const merged = aboveFold.concat(mirrored);
	const postFoldDots = remove2DArrDuplicates(merged);
	return postFoldDots;
}

const doFolds = (dots, folds) => {
	let dotsCpy = dots.concat();
	const formatedFolds = folds.map(fold => fold.split('='));
	
	for (const fold of formatedFolds) {
		if (fold[0] === 'x') {
			dotsCpy = foldLeft(dotsCpy, fold[1]);
		} else {
			dotsCpy = foldUp(dotsCpy, fold[1]);
		}
	}

	return dotsCpy;
}

const prettyPrintInstructions = (dots) => {
	const lineOne = dots.filter(dot => dot[1] === 0);
	const lineTwo = dots.filter(dot => dot[1] === 1);
	const lineThree = dots.filter(dot => dot[1] === 2);
	const lineFour = dots.filter(dot => dot[1] === 3);
	const lineFive = dots.filter(dot => dot[1] === 4);
	const lineSix = dots.filter(dot => dot[1] === 5);
	const lines = [lineOne, lineTwo, lineThree, lineFour, lineFive, lineSix];

	for (const line of lines) {
		line.sort((a, b) => a[0] - b[0]);
		let lineString = '';
		for (let i = 0; i < line.length; i++) {
			let numSpaces = 0;
			if (line[i + 1]) {
				numSpaces = line[i+1][0] - line[i][0] - 1;
			}
			lineString = lineString.concat(`#${numSpaces > 0 ? ' '.repeat(numSpaces) : ''}`)
		}
		console.log(lineString);
	}
}

const result = doFolds(dotCoordinates, foldInstructions);
prettyPrintInstructions(result);