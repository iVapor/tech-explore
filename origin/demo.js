'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


// Complete the commonSubstring function below.
function commonSubstring(a, b) {


}
function main() {
    const aCount = parseInt(readLine().trim(), 10);

    let a = [];

    for (let i = 0; i < aCount; i++) {
        const aItem = readLine();
        a.push(aItem);
    }

    const bCount = parseInt(readLine().trim(), 10);

    let b = [];

    for (let i = 0; i < bCount; i++) {
        const bItem = readLine();
        b.push(bItem);
    }

    commonSubstring(a, b);
}

main()