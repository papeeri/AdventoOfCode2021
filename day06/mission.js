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

part1(input);
