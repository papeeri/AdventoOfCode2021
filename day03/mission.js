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

function part2(input) {
    let oxygenGeneratorRating = getRating(input, 'most common');
    let CO2ScrubberRating = getRating(input, 'least common');

    console.log('oxygenGeneratorRating:', oxygenGeneratorRating);
    console.log('CO2ScrubberRating:', CO2ScrubberRating);

    console.log('Life support rating:', oxygenGeneratorRating * CO2ScrubberRating);
}

function getRating(input, bitCriteria) {
    let inputPart = input;

    while (inputPart.length > 1) {
        for (let position = 0; position < input[0].split('').length; position++) {
            let ones = [];
            let zeros = [];

            for (let i = 0; i < inputPart.length; i++) {
                if (inputPart[i].split('')[position] === '1') {
                    ones.push(inputPart[i]);
                }

                if (inputPart[i].split('')[position] === '0') {
                    zeros.push(inputPart[i]);
                }
            }

            if (bitCriteria === 'most common') {
                if (ones.length >= zeros.length) {
                    inputPart = ones;
                } else {
                    inputPart = zeros;
                }
            } else {
                if (zeros.length <= ones.length) {
                    inputPart = zeros;
                } else {
                    inputPart = ones;
                }
            }

            if (inputPart.length === 1) {
                return parseInt(inputPart[0], 2);
            }
        }
    }

    return parseInt(inputPart[0], 2);
}

part2(input);
