const code = `
struct ContentView: some View {
  var body: some View {
    Text("Hello World")
        .font(.caption)
        .bold()
  }
}
`;

let result = code.trim();
//result = result.replaceAll('\n', '\\n');
result = result.replaceAll('\r', "");
result = result.replaceAll('"', "\"");
console.log(result);

// run this like to copy result directly into clipboard
// node source-to-string.js | pbcopy
