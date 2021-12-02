const fs = require('fs');

let input = fs.readFileSync('./day02/input.txt', 'utf8').split(/\r?\n/);

function getDirection(row) {
    return row.split(' ')[0];
}

function getUnit(row) {
    return parseInt(row.split(' ')[1]);
}

function part1(input) {
    let horizontalPosition = 0;
    let depth = 0;

    for (let i = 0; i < input.length; i++) {
        if (getDirection(input[i]) === 'forward') {
            horizontalPosition = horizontalPosition + getUnit(input[i]);
        }

        if (getDirection(input[i]) === 'up') {
            depth = depth - getUnit(input[i]);
        }

        if (getDirection(input[i]) === 'down') {
            depth = depth + getUnit(input[i]);
        }
    }

    console.log('Horizontal position:', horizontalPosition);
    console.log('Depth:', depth);
    console.log('Horizontal position * Depth:', horizontalPosition * depth);
}

function part2(input) {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;

    for (let i = 0; i < input.length; i++) {
        if (getDirection(input[i]) === 'forward') {
            horizontalPosition = horizontalPosition + getUnit(input[i]);
            depth = depth + aim * getUnit(input[i]);
        }

        if (getDirection(input[i]) === 'up') {
            aim = aim - getUnit(input[i]);
        }

        if (getDirection(input[i]) === 'down') {
            aim = aim + getUnit(input[i]);
        }
    }

    console.log('Horizontal position:', horizontalPosition);
    console.log('Depth:', depth);
    console.log('Aim:', aim);
    console.log('Horizontal position * Depth:', horizontalPosition * depth);
}

part2(input);
