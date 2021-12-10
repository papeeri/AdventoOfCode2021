const fs = require('fs');

let input = fs.readFileSync('./day08/input.txt', 'utf8').split(/\r?\n/);

function part1(input) {
    let signalPattern = parseInput(input);

    // 1: 2 digits
    // 4: 4 digits
    // 7: 3 digits
    // 8: 7 digits

    let count = 0;

    for (let i = 0; i < signalPattern.length; i++) {
        // console.log(signalPattern[i].output);

        for (let idx = 0; idx < signalPattern[i].output.length; idx++) {
            // console.log(signalPattern[i].output[idx]);
            if (
                signalPattern[i].output[idx].length === 2 ||
                signalPattern[i].output[idx].length === 4 ||
                signalPattern[i].output[idx].length === 3 ||
                signalPattern[i].output[idx].length === 7
            ) {
                count++;
            }
        }
    }

    console.log('Count:', count);
}

function part2(input) {
    let signalPattern = parseInput(input);
    let wireConfigurations = generatePermutations(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

    let segmentsMap = new Map([
        ['012456', 0],
        ['25', 1], //       0000
        ['02346', 2], //   1    2
        ['02356', 3], //   1    2
        ['1235', 4], //     3333
        ['01356', 5], //   4    5
        ['013456', 6], //  4    5
        ['025', 7], //      6666
        ['0123456', 8],
        ['012356', 9],
    ]);

    let sum = 0;
    for (let i = 0; i < signalPattern.length; i++) {
        let correctConfig = getCorrectConfig(wireConfigurations, signalPattern[i].input, segmentsMap);
        let decodedOutput = getDecodedOutput(signalPattern[i].output, correctConfig, segmentsMap);

        sum += decodedOutput;
    }

    console.log('Sum:', sum);
}

function getDecodedOutput(signalPatternOutput, correctConfig, segmentsMap) {
    let decodedArray = [];
    for (let output of signalPatternOutput) {
        let translatedSignal = translate(output, correctConfig);
        let newDigit = signalToDigit(translatedSignal, segmentsMap);
        decodedArray.push(newDigit);
    }

    let decodedOutput = decodedArray.join('');
    return parseInt(decodedOutput);
}

function getCorrectConfig(wireConfigurations, signalPatternInput, segmentsMap) {
    for (let config of wireConfigurations) {
        if (isCorrectConfig(signalPatternInput, config, segmentsMap)) {
            return config;
        }
    }
}

function isCorrectConfig(signalPatternInput, config, segmentsMap) {
    let digits = [];

    for (let signal of signalPatternInput) {
        let translatedSignal = translate(signal, config);
        let newDigit = signalToDigit(translatedSignal, segmentsMap);

        if (newDigit === undefined) {
            return false;
        }

        if (digits[newDigit] !== undefined) {
            return false;
        }

        digits[newDigit] = translatedSignal;
    }

    return true;
}

function signalToDigit(signal, segmentsMap) {
    return segmentsMap.get(signal);
}

function translate(signal, config) {
    let translatedSignal = signal
        .split('')
        .map((chr) => config.indexOf(chr))
        .sort()
        .join('');

    return translatedSignal;
}

function isOdd(n) {
    return n % 2 === 1;
}

function not(fn) {
    return function inverted(...args) {
        return !fn(...args);
    };
}

var isEven = not(isOdd);

function generatePermutations(array) {
    function swap(arr, i, j) {
        var b = arr[j];
        arr[j] = arr[i];
        arr[i] = b;
    }

    function recursiveHeap(k, A, S) {
        if (k === 1) {
            S.add(A.join(''));
        } else {
            recursiveHeap(k - 1, A, S);
            for (var i = 0; i < k - 1; i++) {
                if (isEven(k)) swap(A, i, k - 1);
                else swap(A, 0, k - 1);
                recursiveHeap(k - 1, A, S);
            }
        }
    }
    let S = new Set();
    recursiveHeap(array.length, array.slice(), S);
    return S;
}

function parseInput(input) {
    let signalPattern = [];

    for (let i = 0; i < input.length; i++) {
        let inputRowParts = input[i].split(' | ');
        let signalPatternInput = inputRowParts[0].split(' ');
        let signalPatternOutput = inputRowParts[1].split(' ');

        signalPattern.push({ input: signalPatternInput, output: signalPatternOutput });
    }

    return signalPattern;
}

part2(input);
