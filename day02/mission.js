const fs = require("fs");

let input = fs.readFileSync("./day02/input.txt", "utf8").split(/\r?\n/);

function getDirection(row) {
    return row.split(" ")[0];
}

function getUnit(row) {
    return parseInt(row.split(" ")[1]);
}

function part1(input) {
    let forward = 0;
    let depth = 0;

    for (let i = 0; i < input.length; i++) {
        if (getDirection(input[i]) === "forward") {
            forward = forward + getUnit(input[i]);
        }

        if (getDirection(input[i]) === "up") {
            depth = depth - getUnit(input[i]);
        }

        if (getDirection(input[i]) === "down") {
            depth = depth + getUnit(input[i]);
        }
    }

    console.log("Forward:", forward);
    console.log("Depth:", depth);
    console.log("Forward * Y:", forward * depth);
}

part1(input);
