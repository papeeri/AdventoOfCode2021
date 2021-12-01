const fs = require("fs");

let input = fs.readFileSync("./day01/input.txt", "utf8").split(/\r?\n/);

function part1(input) {
  let numberOfIncreases = 0;
  let previousDepth = null;

  for (let x = 0; x < input.length; x++) {
    if (previousDepth === null) {
      previousDepth = parseInt(input[x]);
      continue;
    }

    if (previousDepth < parseInt(input[x])) {
      numberOfIncreases++;
    }

    previousDepth = parseInt(input[x]);
  }

  console.log(numberOfIncreases);
}

part1(input);
