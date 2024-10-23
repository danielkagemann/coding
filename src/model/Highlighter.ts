interface HighlightPattern {
    regex: RegExp,
    className: string
}

const _processing = (patterns: HighlightPattern[], code: string): string => {
    if (code.length === 0) {
        return code;
    }

    patterns.forEach(({regex, className}) => {

        // Use a replace function that checks for matches
        code = code.replace(regex, (match) => {
            if (match) {
                // Only wrap the match if it exists
                return `<span class="${className}">${match}</span>`;
            }
            // Otherwise, return the unmodified part of the code
            return match;
        });
    });
    return code;
};

const _swift = (code: string): string => {
    // Define regular expressions for different parts of Swift syntax
    const patterns: HighlightPattern[] = [
        //{ regex: /"(?:\\.|[^"\\])*"/g, className: 'string' }, // Double-quoted strings with escape sequences
        {
            regex: /\b(let|var|func|class|struct|if|else|for|while|return|import|public|private|fileprivate|internal|enum|case|switch|do|catch|try|guard|defer|init|self)\b/g,
            className: 'keyword'
        }, // Keywords
        {regex: /\/\/.*/g, className: 'comment'}, // Single-line comments
        {regex: /\/\*[\s\S]*?\*\//g, className: 'comment'}, // Multi-line comments
        {regex: /\b\d+(\.\d+)?\b/g, className: 'number'}, // Numbers
        {regex: /\b[A-Z][A-Za-z0-9_]*\b/g, className: 'type'}, // Type names (starting with capital letters)
        {regex: /\b(self|super|true|false|nil)\b/g, className: 'constant'}, // Special variables and literals
    ];
    return _processing(patterns, code);
};

const _typescript = (code: string): string => {
    const patterns: HighlightPattern[] = [
        //{ regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g, className: 'string' }, // Strings (single, double, template literals)
        { regex: /\b(const|let|var|function|class|interface|extends|implements|enum|type|if|else|for|while|do|return|switch|case|break|continue|import|export|default|new|throw|try|catch|finally|async|await|public|private|protected|static|get|set|readonly|as|in|of|instanceof|typeof|void|any|never|unknown|boolean|number|string|object)\b/g, className: 'keyword' }, // Keywords
        { regex: /\/\/.*/g, className: 'comment' }, // Single-line comments
        { regex: /\b\d+(\.\d+)?\b/g, className: 'number' }, // Numbers
        { regex: /\b[A-Z][A-Za-z0-9_]*\b/g, className: 'type' }, // Type names (starting with capital letters)
        { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'constant' }, // Boolean literals and special constants
        { regex: /\/\*[\s\S]*?\*\//g, className: 'comment' }, // Multi-line comments
    ];

    return _processing(patterns, code);
};

const _bash = (code: string): string => {
    const patterns:HighlightPattern[] = [
        // { regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, className: 'string' }, // Strings (single and double quoted)
        { regex: /\b(if|then|else|elif|fi|for|while|do|done|in|case|esac|function|select|until|break|continue|return|exit)\b/g, className: 'keyword' }, // Bash keywords
        { regex: /#[^\n]*/g, className: 'comment' }, // Single-line comments (starting with #)
        { regex: /\$\w+/g, className: 'variable' }, // Variables like $var or ${var}
        { regex: /\b\d+(\.\d+)?\b/g, className: 'number' }, // Numbers
        { regex: /\b(true|false|null)\b/g, className: 'constant' }, // Boolean literals and null
        { regex: /\b(echo|cd|ls|pwd|grep|awk|sed|chmod|chown|mkdir|rm|touch|cat|head|tail|find|exit)\b/g, className: 'keyword' }, // Common bash commands
    ];

    return _processing(patterns, code);
};

const forLanguage = (language: string, code: string): string => {
    if (language === 'swift') {
        return _swift(code);
    }
    if (language === 'ts' ||language === 'typescript') {
        return _typescript(code);
    }
    if (language === 'bash') {
        return _bash(code);
    }
    // untouched
    return code;
};


export const $Highlighter = {
    forLanguage
};