const fs = require('fs');

let input = fs.readFileSync('./day07/input.txt', 'utf8').split(/\r?\n/);

function part1(input) {
    let positions = input[0].split(',').map(function (x) {
        return parseInt(x, 10);
    });

    positions.sort((a, b) => a - b);
    let median = positions[positions.length / 2];

    let fuel = 0;

    for (let i = 0; i < positions.length; i++) {
        fuel += Math.abs(positions[i] - median);
    }

    console.log(fuel);
}

function part2(input) {
    let positions = input[0].split(',').map(function (x) {
        return parseInt(x, 10);
    });

    let avarage = getAvarage(positions);

    let fuel = 0;

    for (let i = 0; i < positions.length; i++) {
        let steps = Math.abs(positions[i] - avarage);
        fuel += (steps * (steps + 1)) / 2;
    }

    console.log(fuel);
}

function getAvarage(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }

    let avarage = sum / array.length;

    return Math.floor(avarage);
}

part2(input);
