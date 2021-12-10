import { getInputData, sum } from '../utils.js';

const _inputPath = './day09/input.txt';

function parser(input) {
    return input.split(/\r?\n/).map((row, rowIndex) =>
        row.split('').map((col, colIndex) => ({
            row: rowIndex,
            col: colIndex,
            value: Number(col),
        }))
    );
}

function part2() {
    let matrix = getInputData(_inputPath)(parser);
    let lowPoints = findLowPoints(matrix);

    let basins = lowPoints.map((point) => exploreBasin(matrix, point)).sort((a, b) => b - a);

    console.log('Answer:', basins[0] * basins[1] * basins[2]);
}

function exploreBasin(matrix, lowPoint) {
    let neighbors = getNeighbors(matrix);
    let basin = new Set();

    function explore(point) {
        if (point.isExplored || point.value === 9) return;

        point.isExplored = true;
        basin.add(point);
        neighbors(point).forEach(explore);
    }
    explore(lowPoint);
    return basin.size;
}

function findLowPoints(matrix) {
    let neighbors = getNeighbors(matrix);
    let isLowPoint = (point) => neighbors(point).every((neighbor) => point.value < neighbor.value);
    return matrix.flat().filter(isLowPoint);
}

function getNeighbors(matrix) {
    return function ({ row, col }) {
        let neighbors = [];
        if (row > 0) neighbors.push(matrix[row - 1][col]); // top
        if (col + 1 < matrix[0].length) neighbors.push(matrix[row][col + 1]); // right
        if (row + 1 < matrix.length) neighbors.push(matrix[row + 1][col]); // bottom
        if (col > 0) neighbors.push(matrix[row][col - 1]); // left
        return neighbors;
    };
}

part2();
