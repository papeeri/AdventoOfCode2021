import { getInputData } from "../lib/utils.js";

const _inputPath = "./day14/input.txt";

function parser(inputData) {
    let rows = inputData.split(/\r?\n/);

    let template = rows[0];

    let mapper = new Map();

    for (let i = 2; i < rows.length; i++) {
        let keyVal = rows[i].split(" -> ");

        mapper.set(keyVal[0], keyVal[1]);
    }

    return { template, mapper };
}

function getNewValue(mapper, char1, char2) {
    let rule = mapper.get(char1 + char2);

    let newValue = char1 + rule;
    return newValue;
}

function getOccurrences(template) {
    let occurrences = [];

    let templateArray = template.split("");

    templateArray.map((chr) => {
        if (!occurrences[chr]) {
            occurrences[chr] = 1;
        } else {
            occurrences[chr]++;
        }
    });

    return occurrences;
}

function mission() {
    let input = getInputData(_inputPath)(parser);

    console.log("Template:", input.template);
    let stepTemplate = input.template;

    for (let step = 1; step <= 10; step++) {
        let templateArray = stepTemplate.split("");
        let newStep = "";
        for (let i = 0; i < stepTemplate.length - 1; i++) {
            newStep += getNewValue(input.mapper, templateArray[i], templateArray[i + 1]);
        }
        newStep += templateArray[stepTemplate.length - 1];
        console.log("After step " + step + ":", newStep);

        stepTemplate = newStep;
    }

    let occurrences = getOccurrences(stepTemplate);

    let mostCommon = 0;
    let leastCommon = Number.MAX_VALUE;

    stepTemplate.split("").map((chr) => {
        let count = occurrences[chr];

        if (count > mostCommon) {
            mostCommon = count;
        }

        if (count < leastCommon) {
            leastCommon = count;
        }
    });

    console.log("Answer: ", mostCommon - leastCommon);
}

mission();
