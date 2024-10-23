const code = `
# switch to home folder
cd ~
# check what is in there
ls -alh
`;

let result = code.trim();
result = result.replaceAll('\n', '<br/>');
result = result.replaceAll('\r', "");
result = result.replaceAll('"', "\"");
console.log(result);

// run this like to copy result directly into clipboard
// node source-to-string.js | pbcopy
