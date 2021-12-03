const fs = require('fs');

let input = fs.readFileSync('./day03/input.txt', 'utf8').split(/\r?\n/);

function part1(input) {
    let mostCommon = '';
    let leastCommon = '';

    for (let position = 0; position < 12; position++) {
        let ones = 0;
        let zeros = 0;

        for (let i = 0; i < input.length; i++) {
            if (input[i].split('')[position] === '1') {
                ones++;
            }

            if (input[i].split('')[position] === '0') {
                zeros++;
            }
        }

        if (ones > zeros) {
            mostCommon += '1';
            leastCommon += '0';
        } else {
            mostCommon += '0';
            leastCommon += '1';
        }
    }

    console.log('mostCommon:', mostCommon);
    console.log('leastCommon:', leastCommon);

    let gammaRate = parseInt(mostCommon, 2);
    let epsilonRate = parseInt(leastCommon, 2);

    console.log('gammaRate:', gammaRate);
    console.log('epsilonRate:', epsilonRate);

    console.log('Power consumption:', gammaRate * epsilonRate);
}

part1(input);
