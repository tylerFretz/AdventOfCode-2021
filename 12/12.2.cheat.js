const fs = require('fs');
const read = fs.readFileSync("./12/data.txt");
const input = read.toString().split("\r\n").map((row) => row.split("-"));

let p = 0;

function day12(name, path, part) {
  let locked = false;
  if(part=="two"){
    let small = path.split(",").filter((el) => el.toLowerCase() == el);
    small.forEach((el) => {
      if (small.filter((n) => n == el).length > 1) {
        locked = true;
      }
    });
  }

  let filters = input.filter((r) => r[0] == name || r[1] == name).map((row) => {
        return row[0]==name ? row[1] : row[0]
    })

  filters.forEach((next) => {
    let isSmall = next.toLowerCase() == next;
    if(next == "end"){
      p++;
    }
    if(next !== "start" && next !== "end"){
      if(part == "two"){
        if (!isSmall ||!locked ||(locked && path.split(",").indexOf(next) == -1)) {
          let newPath = path;
          newPath += `${next},`;
          day12(next, newPath, "two");
        }
      }else{
        if ((isSmall && path.split(",").indexOf(next) == -1) || !isSmall) {
          let newPath = path;
          newPath += `${next},`;
          day12(next, newPath, "one");
        }
      }
    }
  });

}
day12("start", "start,","one");
console.log("Part one = " +p);
p=0
day12("start", "start,", "two");
console.log("Part two = " +p);