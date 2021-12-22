const fs = require('fs');


let depth = 0;
let horizontal = 0;
let aim = 0;


const data = fs.readFileSync('./2/data.txt', 'utf-8')
				.split(/\r?\n/)
				.forEach(val => {
					const parts = val.split(' ');
					switch(parts[0]) {
						case 'forward':
							horizontal += Number(parts[1]);
							depth += (aim * Number(parts[1]));
							break;
						case 'down':
							aim += Number(parts[1]);
							break;
						case 'up':
							aim -= Number(parts[1]);
							break;
					}
				});


console.log(depth);
console.log(horizontal);
console.log(aim);
console.log(depth * horizontal);



