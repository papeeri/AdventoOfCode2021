const fs = require('fs');
const internal = require('stream');

let input = fs.readFileSync('./day04/input.txt', 'utf8').split(/\r?\n/);

function part2(input) {
    let bingoSequence = input[0].split(',');
    let boards = getBoards(input);

    // let bingoSequencePart = [];
    // let bingoSequencePartOnLastWin = [];
    // let lastBingoBoard = [];
    // let winningNumber;

    // for (let i = 0; i < bingoSequence.length; i++) {
    //     bingoSequencePart.push(bingoSequence[i]);

    //     let bingoBoardNumber = getBingoBoardIndex(boards, bingoSequencePart);
    //     console.log('bingoBoardNumber:', bingoBoardNumber);

    //     if (bingoBoardNumber !== -1) {
    //         // console.log(boards.length);
    //         // if (boards.length === 31) {
    //         //     console.log('Last winning board!');
    //         // }

    //         lastBingoBoard = boards[bingoBoardNumber];
    //         bingoSequencePartOnLastWin = bingoSequencePart;
    //         winningNumber = bingoSequence[i];

    //         boards.splice(bingoBoardNumber, 1);
    //     }
    // }

    // let sum = getSumOfUnmarkedNumbers(lastBingoBoard, bingoSequencePartOnLastWin);
    // console.log('lastBingoBoard:', lastBingoBoard);
    // console.log('winningNumber:', winningNumber);
    // console.log('sumOfUnmarkedNumbers:', sum);
    // console.log('sumOfUnmarkedNumbers * winningNumber:', sum * winningNumber);

    let bingoSequencePart = [];
    let lastWinningBingoSequencePart = [];
    let lastBingoBoard = [];
    let winningNumber;

    for (let i = 0; i < bingoSequence.length; i++) {
        bingoSequencePart.push(bingoSequence[i]);

        let bingoBoardIndex;
        do {
            bingoBoardIndex = getBingoBoardIndex(boards, bingoSequencePart);

            if (bingoBoardIndex !== -1) {
                console.log('bingoBoardIndex:', bingoBoardIndex);
                console.log('boards[bingoBoardIndex]:', boards[bingoBoardIndex]);
                lastBingoBoard = boards[bingoBoardIndex];
                lastWinningBingoSequencePart = [...bingoSequencePart];
                winningNumber = bingoSequence[i];

                boards.splice(bingoBoardIndex, 1);
            }
        } while (bingoBoardIndex !== -1);
    }

    let sum = getSumOfUnmarkedNumbers(lastBingoBoard, lastWinningBingoSequencePart);
    console.log('bingoBoard:', lastBingoBoard);
    console.log('winningNumber:', winningNumber);
    console.log('sumOfUnmarkedNumbers:', sum);
    console.log('sumOfUnmarkedNumbers * winningNumber:', sum * winningNumber);
}

function getSumOfUnmarkedNumbers(board, bingoSequencePart) {
    let sum = 0;

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (!bingoSequencePart.includes(board[row][col])) {
                console.log('To sum:', board[row][col]);
                sum += parseInt(board[row][col]);
            }
        }
    }

    return sum;
}

function getBingoBoard(boards, bingoSequencePart) {
    for (let boardNumber = 0; boardNumber < boards.length; boardNumber++) {
        if (boardHasBingo(boards[boardNumber], bingoSequencePart)) {
            return boards[boardNumber];
        }
    }

    return [];
}

function getBingoBoardIndex(boards, bingoSequencePart) {
    for (let boardNumber = 0; boardNumber < boards.length; boardNumber++) {
        if (boardHasBingo(boards[boardNumber], bingoSequencePart)) {
            return boardNumber;
        }
    }

    return -1;
}

function boardHasBingo(board, bingoSequencePart) {
    for (let i = 0; i < board.length; i++) {
        if (sequenceHasBingo(board[i], bingoSequencePart)) {
            return true;
        }

        let columnSequence = [];
        for (let row = 0; row < board.length; row++) {
            columnSequence.push(board[row][i]);
        }

        if (sequenceHasBingo(columnSequence, bingoSequencePart)) {
            return true;
        }
    }

    return false;
}

function sequenceHasBingo(sequence, bingoSequencePart) {
    for (let i = 0; i < sequence.length; i++) {
        if (!bingoSequencePart.includes(sequence[i])) {
            return false;
        }
    }

    return true;
}

function getBoards(input) {
    let boards = [];
    let board = [];
    let row = 0;

    for (let i = 2; i < input.length; i++) {
        if (input[i] === '') {
            boards.push(board);
            board = [,];
            row = 0;
            continue;
        }

        board[row] = input[i].trim().replace(/  /g, ' ').split(' ');
        row++;
    }

    return boards;
}

part2(input);
