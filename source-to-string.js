const code = `
Yo estoy                    Ich bin
Tú estás                    Du bist
Él/ella está                Er/sie ist
Nosotros/nosotras estamos   Wir sind
Ustedes están               Sie sind (formal)
Ellos/ellas están           Er/Sie sind (Gruppe)
`;

let result = code.trim();
//result = result.replaceAll('\n', '\\n');
result = result.replaceAll('\r', "");
result = result.replaceAll('"', "\"");
console.log(result);

// run this like to copy result directly into clipboard
// node source-to-string.js | pbcopy
