const fs = require('fs');

let input = fs.readFileSync('./day08/input.txt', 'utf8').split(/\r?\n/);

function part1(input) {
    let signalPattern = parseInput(input);

    // 1: 2 digits
    // 4: 4 digits
    // 7: 3 digits
    // 8: 7 digits

    let count = 0;

    for (let i = 0; i < signalPattern.length; i++) {
        // console.log(signalPattern[i].output);

        for (let idx = 0; idx < signalPattern[i].output.length; idx++) {
            // console.log(signalPattern[i].output[idx]);
            if (
                signalPattern[i].output[idx].length === 2 ||
                signalPattern[i].output[idx].length === 4 ||
                signalPattern[i].output[idx].length === 3 ||
                signalPattern[i].output[idx].length === 7
            ) {
                count++;
            }
        }
    }

    console.log('Count:', count);
}

function parseInput(input) {
    let signalPattern = [];

    for (let i = 0; i < input.length; i++) {
        let inputRowParts = input[i].split(' | ');
        let signalPatternInput = inputRowParts[0].split(' ');
        let signalPatternOutput = inputRowParts[1].split(' ');

        signalPattern.push({ input: signalPatternInput, output: signalPatternOutput });
    }

    return signalPattern;
}

part1(input);
