const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/);

let template = input[0];
const insertionRules = input.slice(2).map(pair => pair.split(' -> '));

const getCharInsertionIndices = () => {
	// map with character to insert as key, array of insertion indexes as value
	const charIndexMap = new Map();

	for (const [pair, char] of insertionRules) {
		const pairChars = pair.split('');
		const regexp = new RegExp(`${pairChars[0]}(?=${pairChars[1]})`, 'g');
		const matches = template.matchAll(regexp);

		for (const match of matches) {
			if (charIndexMap.has(char)) {
				charIndexMap.set(char, [...charIndexMap.get(char), match.index + 1]);
			} else {
				charIndexMap.set(char, [match.index + 1]);
			}
		}
	}

	return charIndexMap;
}

const updateCharIndices = (charIndexMap, insertionIndex) => {
	for (const [key, value] of charIndexMap) {
		for (let i = 0; i < value.length; i++) {
			if (insertionIndex < value[i]) {
				const indexArray = charIndexMap.get(key);
				indexArray[i] = indexArray[i] + 1;
				charIndexMap.set(key, indexArray);
			} 
		}
	}
}

const prefromStep = () => {
	const charIndexMap = getCharInsertionIndices();
	for (const [key, value] of charIndexMap) {
		for (const index of value) {
			template = template.slice(0, index) + key + template.slice(index);
			updateCharIndices(charIndexMap, index);
		}
	}

	console.log(template);
}

const preformSteps = (amount) => {
	for (let i = 0; i < amount; i++) {
		prefromStep();
	}
}

const getMostCommonChar = () => {
	const templateArr = template.split(''); 
	let max = 0;
	let maxChar = '';
	let visited = [];

	for (const char of templateArr) {
		if (!visited.includes(char)) {
			const templateSplitByChar = template.split(char);
			if (templateSplitByChar.length > max) {
				max = templateSplitByChar.length;
				maxChar = char;
			}
			visited.push(char);
		}
	}
	return {
		char: maxChar,
		freq: max
	};
}

const getLeastCommonChar = () => {
	const templateArr = template.split(''); 
	let min = Number.MAX_SAFE_INTEGER;
	let minChar = '';
	let visited = [];

	for (const char of templateArr) {
		if (!visited.includes(char)) {
			const templateSplitByChar = template.split(char);
			if (templateSplitByChar.length < min) {
				min = templateSplitByChar.length;
				minChar = char;
			}
			visited.push(char);
		}
	}
	return {
		char: minChar,
		freq: min
	};
}

function getFrequency(string) {
    var freq = {};
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }

    return freq;
};

preformSteps(10);

const freq = getFrequency(template);

console.log(freq);

const mcc = getMostCommonChar();
const lcc = getLeastCommonChar();

console.log(mcc);
console.log(lcc);

console.log(`Part 1 answer = ${(mcc.freq - lcc.freq)}`);
