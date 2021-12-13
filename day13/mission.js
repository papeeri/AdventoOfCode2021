import { getInputData } from "../lib/utils.js";

const _inputPath = "./day13/input.txt";

function parser(inputData) {
    let dots = [];
    let folds = [];
    let sizeX = 0;
    let sizeY = 0;

    inputData.split(/\r?\n/).map((row) => {
        if (row.startsWith("fold")) {
            let split = row.replace("fold along ", "").split("=");
            let fold = { axis: split[0], value: parseInt(split[1]) };
            folds.push(fold);
        } else {
            if (row !== "") {
                let split = row.split(",");
                let dot = { x: parseInt(split[0]), y: parseInt(split[1]) };

                if (dot.x + 1 > sizeX) {
                    sizeX = dot.x + 1;
                }

                if (dot.y + 1 > sizeY) {
                    sizeY = dot.y + 1;
                }

                dots.push(dot);
            }
        }
    });

    return { dots, folds, sizeX, sizeY };
}

function getMatrix(input) {
    let matrix = [];

    for (let row = 0; row < input.sizeY; row++) {
        let rowData = [];

        for (let col = 0; col < input.sizeX; col++) {
            rowData.push(".");
        }

        matrix.push(rowData);
    }

    input.dots.map((dot) => {
        matrix[dot.y][dot.x] = "#";
    });

    return matrix;
}

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        let rowString = matrix[i].join("");
        console.log(rowString);
    }
}

function foldUp(matrix, line) {
    let start = line - (matrix.length - 1 - line);

    for (let row = start; row < line; row++) {
        let pop = matrix.pop();

        for (let col = 0; col < pop.length; col++) {
            if (pop[col] === "#") {
                matrix[row][col] = "#";
            }
        }
    }

    matrix.pop();
}

function foldLeft(matrix, column) {
    let start = column - (matrix[0].length - 1 - column);

    for (let row = 0; row < matrix.length; row++) {
        for (let col = start; col < column; col++) {
            let pop = matrix[row].pop();

            if (pop === "#") {
                matrix[row][col] = "#";
            }
        }

        matrix[row].pop();
    }
}

function getDotCount(matrix) {
    let count = 0;

    matrix.map((row) =>
        row.map((col) => {
            if (col === "#") {
                count++;
            }
        })
    );

    return count;
}

function missionPart1() {
    let input = getInputData(_inputPath)(parser);

    let matrix = getMatrix(input);

    printMatrix(matrix);
    console.log("\n");

    if (input.folds[0].axis === "y") {
        foldUp(matrix, input.folds[0].value);
    } else {
        foldLeft(matrix, input.folds[0].value);
    }

    printMatrix(matrix);
    console.log("\n");

    let count = getDotCount(matrix);

    console.log("Visible dots:", count);

    /*
    ...#..#..#. 0
    ....#...... 1
    ........... 2
    #.......... 3
    ...#....#.# 4
    ........... 5
    ........... 6
    ----------- 7
    ........... 8
    ........... 9
    .#....#.##. 10
    ....#...... 11
    ......#...# 12
    #.......... 13
    #.#........ 14
    */
}

function missionPart2() {
    let input = getInputData(_inputPath)(parser);

    let matrix = getMatrix(input);

    printMatrix(matrix);
    console.log("\n");

    for (let fold of input.folds) {
        if (fold.axis === "y") {
            foldUp(matrix, fold.value);
        } else {
            foldLeft(matrix, fold.value);
        }

        printMatrix(matrix);
        console.log("\n");
    }

    let count = getDotCount(matrix);
    console.log("Visible dots:", count);
}

missionPart2();
