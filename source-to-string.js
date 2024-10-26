const code = `
Yo soy.             ich bin
Tu eres             du bist
El/ella es          Er/sie ist
Nosotros somos      Wir sind
Ustedes son         Sie sind (formal)
Ella/ellos son      Sie sind (Gruppe)
`;

let result = code.trim();
//result = result.replaceAll('\n', '\\n');
result = result.replaceAll('\r', "");
result = result.replaceAll('"', "\"");
console.log(result);

// run this like to copy result directly into clipboard
// node source-to-string.js | pbcopy
