import { getInputData } from "../lib/utils.js";

const _inputPath = "./day10/input.txt";

const _closingCharMap = new Map([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
]);

const _pointsMap = new Map([
    [")", 1],
    ["]", 2],
    ["}", 3],
    [">", 4],
]);

function parser(inputData) {
    return inputData.split(/\r?\n/);
}

function isCorrupted(inputRow) {
    let inputRowArray = inputRow.split("");
    let stack = [];

    for (let chr of inputRowArray) {
        if (chr === "(" || chr === "[" || chr === "{" || chr === "<") {
            stack.push(_closingCharMap.get(chr));
        } else {
            let element = stack.pop();
            if (element !== chr) {
                return true;
            }
        }
    }
    return false;
}

function removeCorruptedDataRows(input) {
    let incompleteRows = [];

    for (let inputRow of input) {
        if (!isCorrupted(inputRow)) {
            incompleteRows.push(inputRow);
        }
    }

    return incompleteRows;
}

function getCompletionArray(stack) {
    let completionArray = [];

    stack.map((element) => completionArray.push(_closingCharMap.get(element)));

    return completionArray;
}

function getScore(stack) {
    let score = 0;

    while (stack.length > 0) {
        let element = stack.pop();
        let closingElement = _closingCharMap.get(element);

        score = score * 5;
        score += _pointsMap.get(closingElement);
    }

    return score;
}

function mission() {
    let input = getInputData(_inputPath)(parser);
    let incompleteRows = removeCorruptedDataRows(input);

    let scores = [];

    for (let inputRow of incompleteRows) {
        let stack = [];
        let inputRowArray = inputRow.split("");

        for (let chr of inputRowArray) {
            if (chr === "(" || chr === "[" || chr === "{" || chr === "<") {
                stack.push(chr);
            } else {
                stack.pop();
            }
        }

        scores.push(getScore(stack));
    }

    scores.sort((a, b) => a - b);
    let middleScore = scores[Math.floor(scores.length / 2)];

    console.log("Middle score:", middleScore);
}

mission();
