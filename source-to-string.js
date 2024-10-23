const code = `
const doTheMagic = (iterationCount: number): void => {
    for let i = 0; i < iterationCount; i += 1) {
        console.log("awesome");
    }  
}
`;

let result = code.trim();
result = result.replaceAll('\n', '<br/>');
result = result.replaceAll('\r', "");
result = result.replaceAll('"', "\"");
console.log(result);

// run this like to copy result directly into clipboard
// node source-to-string.js | pbcopy
