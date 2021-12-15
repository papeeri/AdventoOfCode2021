import { getInputData } from "../lib/utils.js";

const _inputPath = "./day14/input.txt";

let _mapper;
let _pairs = new Map();

function parser(inputData) {
    let rows = inputData.split(/\r?\n/);

    let template = rows[0];

    let mapper = new Map();

    for (let i = 2; i < rows.length; i++) {
        let keyVal = rows[i].split(" -> ");

        mapper.set(keyVal[0], keyVal[1]);
    }

    let lastChar = template.split("")[template.length - 1];

    return { template, mapper, lastChar };
}

function getNewPairs(key) {
    let rule = _mapper.get(key);
    let newPair = [];

    let keySplit = key.split("");
    newPair.push(keySplit[0] + rule);
    newPair.push(rule + keySplit[1]);

    return newPair;
}

function getOccurrences(lastChar) {
    let occurrences = new Map();

    for (let pair of _pairs.keys()) {
        let oldValue = _pairs.get(pair);

        let firstChar = pair.split("")[0];

        let chrValue = occurrences.get(firstChar);
        if (chrValue === undefined) {
            occurrences.set(firstChar, oldValue);
        } else {
            occurrences.set(firstChar, oldValue + chrValue);
        }
    }

    occurrences.set(lastChar, occurrences.get(lastChar) + 1);

    return occurrences;
}

function addPair(pair, times) {
    let oldValue = _pairs.get(pair);

    if (oldValue === undefined) {
        _pairs.set(pair, 1 * times);
    } else {
        _pairs.set(pair, oldValue + 1 * times);
    }
}

function mission() {
    let input = getInputData(_inputPath)(parser);
    _mapper = input.mapper;

    // console.log("Template:", input.template);

    let templateArray = input.template.split("");
    for (let i = 0; i < input.template.length - 1; i++) {
        addPair(templateArray[i] + templateArray[i + 1], 1);
    }

    // console.log("Pairs", _pairs);

    for (let step = 1; step <= 40; step++) {
        console.log("Step:", step);
        let templatePairs = new Map(_pairs);
        _pairs = new Map();

        let keys = templatePairs.keys();

        for (let key of keys) {
            let newPairs = getNewPairs(key);
            let times = templatePairs.get(key);

            for (let newPair of newPairs) {
                addPair(newPair, times);
            }
        }

        // console.log("After step " + step + ":", _pairs);
    }

    let occurrences = getOccurrences(input.lastChar);

    let mostCommon = 0;
    let leastCommon = Number.MAX_VALUE;

    for (let chr of occurrences.keys()) {
        let count = occurrences.get(chr);

        if (count > mostCommon) {
            mostCommon = count;
        }

        if (count < leastCommon) {
            leastCommon = count;
        }
    }

    console.log("Answer: ", mostCommon - leastCommon);
}

mission();
