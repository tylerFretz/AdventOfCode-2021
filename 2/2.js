const fs = require('fs');


let depth = 0;
let horizontal = 0;

const data = fs.readFileSync('./2/data.txt', 'utf-8')
				.split(/\r?\n/)
				.forEach(val => {
					const parts = val.split(' ');
					switch(parts[0]) {
						case 'forward':
							horizontal += Number(parts[1]);
							break;
						case 'down':
							depth += Number(parts[1]);
							break;
						case 'up':
							depth -= Number(parts[1]);
							break;
					}
				});


console.log(depth);
console.log(horizontal);
console.log(depth * horizontal);



