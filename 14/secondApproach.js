const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/);

let template = input[0];
const insertionRules = input.slice(2).map(pair => pair.split(' -> '));


const charFrequencyMap = new Map();
const pairFrequencyMap = new Map();

const getInitCharFrequency = (str, map) => {
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        if (map.has(char)) {
           map.set(char, map.get(char) + 1);
        } else {
           map.set(char, 1);
        }
    }
};


const getInitPairFrequency = (map) => {
	for (const [pair, char] of insertionRules) {
		const pairChars = pair.split('');
		const regexp = new RegExp(`${pairChars[0]}(?=${pairChars[1]})`, 'g');
		const matches = template.matchAll(regexp);
		
		for (const match of matches) {
			if (map.has(pair)) {
				map.set(pair, map.get(pair) + 1);
			} else {
				map.set(pair, 1);
			}
		}
	}
};

const getRule = (searchPair) => insertionRules.find(pair => pair[0] === searchPair);

const insertPair = (pair, amount) => {
	if (pairFrequencyMap.has(pair)) {
		const freq = pairFrequencyMap.get(pair);
		pairFrequencyMap.set(pair, freq + amount);
	} else {
		pairFrequencyMap.set(pair, amount);
	}
}

const decrementPair = (pair, amount) => {
	if (pairFrequencyMap.has(pair)) {
		const freq = pairFrequencyMap.get(pair);
		if (freq - amount > 0) {
			pairFrequencyMap.set(pair, freq - amount);
		} else {
			pairFrequencyMap.delete(pair);
		}
	}
}

const incrementChar = (char, amount) => {
	if (charFrequencyMap.has(char)) {
		const freq = charFrequencyMap.get(char);
		charFrequencyMap.set(char, freq + amount);
	} else {
		charFrequencyMap.set(char, amount);
	}
} 

const preformStep = (pairFreqMap) => {
	const temp = new Map(pairFreqMap);
	for (const [pair, freq] of temp) {
		const rule = getRule(pair);
		const chars = pair.split('');
		const newChar = rule[1];
		incrementChar(newChar, freq);
		insertPair(chars[0].concat(newChar), freq);
		insertPair(newChar.concat(chars[1]), freq);
		decrementPair(pair, freq);
	}
}

const preformSteps = (num) => {
	for (let i = 0; i < num; i++) {
		preformStep(pairFrequencyMap);
	}
}

getInitPairFrequency(pairFrequencyMap);
getInitCharFrequency(template, charFrequencyMap);

preformSteps(40);

console.log(pairFrequencyMap);
console.log(charFrequencyMap);


const getResult = () => {
	let max = 0;
	let min = Number.MAX_VALUE;
	for (const count of charFrequencyMap.values()) {
		if (count < min) {
			min = count;
		}
		if (count > max) {
			max = count;
		}
	}
	return max - min;
}

const result = getResult()
console.log(result);
// 3941782230241