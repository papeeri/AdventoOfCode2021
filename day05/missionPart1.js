const fs = require('fs');
const internal = require('stream');

let input = fs.readFileSync('./day05/inputPart.txt', 'utf8').split(/\r?\n/);

function part1(input) {
    let parsedInput = parseInput(input);
    let hv = removeDiagonal(parsedInput);

    let largestNumber = getLargestNumber(hv);

    let matrix = createEmptyMatrix(largestNumber);

    fillMatrix(matrix, hv);

    console.log(input);
}

function fillMatrix(matrix, hv) {
    for (let i = 0; i < hv.length; i++) {
        console.log(hv[i]);
        let xTravel = getTravel(hv[i].x1, hv[i].x2);
        let yTravel = getTravel(hv[i].y1, hv[i].y2);

        if (xTravel.length > 1) {
            for (let i = xTravel[0]; i <= xTravel[xTravel.length - 1]; i++) {
                matrix[yTravel[0]][i]++;
            }
        }

        if (yTravel.length > 1) {
            for (let i = yTravel[0]; i <= yTravel[yTravel.length - 1]; i++) {
                matrix[i][xTravel[0]]++;
            }
        }

        // matrix[hv[i].x1][hv[i].y1]++;
    }
}

function getTravel(i1, i2) {
    let travel = [];
    let bigger;
    let smaller;

    if (i1 === i2) {
        travel.push(i1);
        return travel;
    }

    if (i1 > i2) {
        bigger = i1;
        smaller = i2;
    } else {
        bigger = i2;
        smaller = i1;
    }

    for (let i = smaller; i <= bigger; i++) {
        travel.push(i);
    }

    return travel;
}

function createEmptyMatrix(size) {
    let matrix = [];

    let row = [];
    for (let i = 0; i <= size; i++) {
        row.push(0);
    }

    for (let i = 0; i <= size; i++) {
        matrix[i] = [...row];
    }

    return matrix;
}

function getLargestNumber(hv) {
    let largestNumber = 0;

    for (let i = 0; i < hv.length; i++) {
        if (hv[i].x1 > largestNumber) {
            largestNumber = hv[i].x1;
        }

        if (hv[i].x2 > largestNumber) {
            largestNumber = hv[i].x2;
        }

        if (hv[i].y1 > largestNumber) {
            largestNumber = hv[i].y1;
        }

        if (hv[i].y2 > largestNumber) {
            largestNumber = hv[i].y2;
        }
    }

    return largestNumber;
}

function removeDiagonal(parsedInput) {
    let hv = [];

    for (let i = 0; i < parsedInput.length; i++) {
        if (parsedInput[i].x1 === parsedInput[i].x2 || parsedInput[i].y1 === parsedInput[i].y2) {
            hv.push(parsedInput[i]);
        }
    }

    return hv;
}

function parseInput(input) {
    let parsed = [];

    for (let i = 0; i < input.length; i++) {
        let xy = input[i].split(' -> ');
        let xy1 = xy[0].split(',');
        let xy2 = xy[1].split(',');

        parsed.push({ x1: parseInt(xy1[0]), y1: parseInt(xy1[1]), x2: parseInt(xy2[0]), y2: parseInt(xy2[1]) });
    }

    return parsed;
}

part1(input);
