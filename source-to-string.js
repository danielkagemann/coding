const code = `
func generateRandomArray(size: Int, range: ClosedRange<Int>) -> [Int] {
    var randomArray: [Int] = Array(repeating: 0, count: size)
      .map { _ in Int.random(in: range) }

    return randomArray  
}
`;

let result = code.trim();
result = result.replaceAll('\n', '<br/>');
result = result.replaceAll('\r', "");
result = result.replaceAll('"', "\"");
console.log(result);

// run this like to copy result directly into clipboard
// node source-to-string.js | pbcopy
