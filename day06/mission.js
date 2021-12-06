const fs = require('fs');

let input = fs.readFileSync('./day06/input.txt', 'utf8').split(/\r?\n/);

function part1(input) {
    let state = input[0].split(',').map(function (x) {
        return parseInt(x, 10);
    });

    // console.log('Initial state:\t      ', state);

    for (let day = 1; day <= 80; day++) {
        let length = state.length;
        for (let i = 0; i < length; i++) {
            state[i]--;

            if (state[i] === -1) {
                state[i] = 6;
                state.push(8);
            }
        }
        // console.log('After', day, '\t days:', state);
    }

    console.log(state.length);
}

function part2(input) {
    let state = input[0].split(',').map(function (x) {
        return parseInt(x, 10);
    });

    let distinct = getDistinct();

    for (let i = 0; i < state.length; i++) {
        distinct[state[i]]++;
    }

    for (let day = 1; day <= 256; day++) {
        let newDistinct = getDistinct();

        for (let i = 0; i < 9; i++) {
            if (i === 0) {
                newDistinct[6] += distinct[0];
                newDistinct[8] += distinct[0];
            } else {
                newDistinct[i - 1] += distinct[i];
            }
        }

        distinct = [...newDistinct];
    }

    let amount = getAmount(distinct);

    console.log(amount);
}

function getAmount(distinct) {
    let amount = 0;

    for (let i = 0; i < 9; i++) {
        amount += distinct[i];
    }

    return amount;
}

function getDistinct() {
    let distinct = [];

    for (let i = 0; i < 9; i++) {
        distinct.push(0);
    }

    return distinct;
}

part2(input);
