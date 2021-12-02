const fs = require("fs");

let input = fs.readFileSync("./day02/input.txt", "utf8").split(/\r?\n/);

function getDirection(row) {
    return row.split(" ")[0];
}

function getUnit(row) {
    return parseInt(row.split(" ")[1]);
}

function part1(input) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < input.length; i++) {
        if (getDirection(input[i]) === "forward") {
            x = x + getUnit(input[i]);
        }

        if (getDirection(input[i]) === "up") {
            y = y - getUnit(input[i]);
        }

        if (getDirection(input[i]) === "down") {
            y = y + getUnit(input[i]);
        }
    }

    console.log("X:", x);
    console.log("Y:", y);
    console.log("X * Y:", x * y);
}

part1(input);
