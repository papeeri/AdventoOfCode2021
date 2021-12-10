import { getInputData } from '../lib/utils.js';

const _inputPath = './dayDAYNUMBER/input.txt';

function parser(inputData) {
    return inputData.split(/\r?\n/);
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    console.log(input);
    console.log("End");
}

mission();
