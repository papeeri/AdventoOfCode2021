const fs = require('fs');

let input = fs
    .readFileSync('./day09/input.txt', 'utf8')
    .split(/\r?\n/)
    .map((row) => row.split('').map((s) => parseInt(s)));

function part1(input) {
    let sum = 0;

    for (let x = 0; x < input.length; x++) {
        // console.log(input[x]);

        for (let y = 0; y < input[0].length; y++) {
            // console.log(input[x][y]);

            if (isLowest(input, x, y)) {
                // console.log('Lowest:', input[x][y]);
                sum += input[x][y] + 1;
            }
        }
    }

    console.log('Sum:', sum);
}

function isLowest(input, x, y) {
    let value = input[x][y];
    // console.log('x:', x, 'y:', y, 'value:', value);

    if (isLowerOrEqual(value, input, x - 1, y)) {
        return false;
    }

    if (isLowerOrEqual(value, input, x + 1, y)) {
        return false;
    }

    if (isLowerOrEqual(value, input, x, y - 1)) {
        return false;
    }

    if (isLowerOrEqual(value, input, x, y + 1)) {
        return false;
    }

    return true;
}

function isLowerOrEqual(value, input, x, y) {
    if (x < 0 || y < 0) {
        return false;
    }

    if (x >= input.length || y >= input[0].length) {
        return false;
    }

    if (input[x][y] <= value) {
        return true;
    }

    return false;
}

part1(input);
