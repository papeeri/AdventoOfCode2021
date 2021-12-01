const fs = require("fs");

let input = fs.readFileSync("./day01/input.txt", "utf8").split(/\r?\n/);

function part1(input) {
  for (let x = 0; x < input.length; x++) {
    for (let y = x + 1; y < input.length; y++) {
      if (parseInt(input[x]) + parseInt(input[y]) === 2020) {
        console.log(input[x]);
        console.log(input[y]);

        console.log(input[x] * input[y]);
        return;
      }
    }
  }
}

part1(input);
