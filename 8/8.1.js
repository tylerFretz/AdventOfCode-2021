const path = require('path');
const fs = require('fs');

const data = fs
	.readFileSync(path.join(__dirname, 'data.txt'), 'utf8')
	.toString()
	.trim()
	.split(/\r?\n/)
	.map(line => [line.substring(0, line.indexOf('|') - 1).split(' '), line.substring(line.indexOf('|') + 2).split(' ')]);

console.log(data);

let total = 0;
for (const [ref, code] of data) {
	let subtotal = '';
	for (const num of code) {	
		if (num.length === 7) {
			subtotal = subtotal.concat('8');
		} else if (num.length === 4) {
			subtotal = subtotal.concat('4');
		} else if (num.length === 3) {
			subtotal = subtotal.concat('7')
		} else if (num.length === 2) {
			subtotal = subtotal.concat('1');
		} else {
			// 2, 3, or 5
			if (num.length === 5) {
				const oneRef = ref.find(r => r.length === 2);

				// must be 3
				if (num.includes(oneRef.charAt(0)) && num.includes(oneRef.charAt(1))) {
					subtotal = subtotal.concat('3');
				} 
				// either 2 or 5
				else {
					const fourRef = ref.find(r => r.length === 4);
					let hitCount = 0;

					for (let i = 0; i < 4; i++) {
						if (num.includes(fourRef.charAt(i))) {
							hitCount++;
						}
					}

					if (hitCount === 2) {
						subtotal = subtotal.concat('2');
					} else {
						subtotal = subtotal.concat('5');
					}
				}
			}
			// 0, 6, or 9
			else if (num.length === 6) {
				const oneRef = ref.find(r => r.length === 2);

				// must be 6
				if (!(num.includes(oneRef.charAt(0)) && num.includes(oneRef.charAt(1)))) {
					subtotal = subtotal.concat('6');
				} 				
				// either 0 or 9
				else {
					const fourRef = ref.find(r => r.length === 4);
					let hitCount = 0;

					for (let i = 0; i < 4; i++) {
						if (num.includes(fourRef.charAt(i))) {
							hitCount++;
						}
					}

					if (hitCount === 3) {
						subtotal = subtotal.concat('0');
					} else {
						subtotal = subtotal.concat('9');
					}
				}
			}
		}
	}
	console.log(subtotal);
	total += parseInt(subtotal, 10);
}

console.log(total);