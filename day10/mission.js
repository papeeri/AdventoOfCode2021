import { getInputData } from "../lib/utils.js";

const _inputPath = "./day10/input.txt";

function parser(inputData) {
    return inputData.split(/\r?\n/);
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    const points = new Map([
        [")", 3],
        ["]", 57],
        ["}", 1197],
        [">", 25137],
    ]);

    const closingCharMap = new Map([
        ["(", ")"],
        ["[", "]"],
        ["{", "}"],
        ["<", ">"],
    ]);

    let found = {
        ")": 0,
        "]": 0,
        "}": 0,
        ">": 0,
    };

    for (let inputRow of input) {
        let stack = [];
        let inputRowArray = inputRow.split("");

        for (let chr of inputRowArray) {
            if (chr === "(" || chr === "[" || chr === "{" || chr === "<") {
                stack.push(closingCharMap.get(chr));
            } else {
                let element = stack.pop();
                if (element !== chr) {
                    found[chr]++;
                }
            }
        }
    }

    let sum = 0;
    Object.keys(found).map((key) => {
        sum += found[key] * points.get(key);
    });

    console.log("Score:", sum);
}

mission();
