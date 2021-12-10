import * as fs from 'fs';

export function getInputData(path) {
    var input = fs.readFileSync(path, 'utf8');
    return function parseContent(parser) {
        return parser(input);
    };
}

export function sum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}
