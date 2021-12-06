const fs = require('fs');

let input = fs.readFileSync('./day05/input.txt', 'utf8').split(/\r?\n/);

function part2(input) {
    let parsedInput = parseInput(input);
    let size = getLargestNumber(parsedInput);
    let matrix = createEmptyMatrix(size);

    fillMatrix(matrix, parsedInput);

    let overlap = 0;
    for (let x = 0; x <= size; x++) {
        for (let y = 0; y <= size; y++) {
            if (matrix[y][x] > 1) {
                overlap++;
            }
        }
    }

    // printMatrix(matrix);
    console.log(overlap);
}

function printMatrix(matrix) {
    for (let x = 0; x < matrix.length; x++) {
        let row = '';
        for (let y = 0; y < matrix.length; y++) {
            if (matrix[x][y] === 0) {
                row += '.';
            } else {
                row += matrix[x][y];
            }
        }

        console.log(row);
    }

    console.log('');
}

function fillMatrix(matrix, input) {
    for (let i = 0; i < input.length; i++) {
        let points = getPoints(input[i]);

        for (let idx = 0; idx < points.length; idx++) {
            matrix[points[idx].y][points[idx].x]++;
        }

        // printMatrix(matrix);
    }
}

function getRange(start, end) {
    let direction = Math.sign(end - start);
    let points = [];

    for (let x = start; x !== end; x += direction) {
        points.push(x);
    }

    points.push(end);

    return points;
}

function getPoints(xy) {
    let points = [];
    let xPoints = getRange(xy.x1, xy.x2);
    let yPoints = getRange(xy.y1, xy.y2);

    if (xPoints.length === yPoints.length) {
        for (let i = 0; i < xPoints.length; i++) {
            points.push({ x: xPoints[i], y: yPoints[i] });
        }
        return points;
    }

    if (xPoints.length > 1) {
        for (let i = 0; i < xPoints.length; i++) {
            points.push({ x: xPoints[i], y: yPoints[0] });
        }
    }

    if (yPoints.length > 1) {
        for (let i = 0; i < yPoints.length; i++) {
            points.push({ x: xPoints[0], y: yPoints[i] });
        }
    }

    return points;
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

part2(input);
