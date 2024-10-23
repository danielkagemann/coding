const _swift = (code:string): string => {

    // Define regular expressions for different parts of Swift syntax
    const patterns: { regex: RegExp; className: string }[] = [
        //{ regex: /"(?:\\.|[^"\\])*"/g, className: 'string' }, // Double-quoted strings with escape sequences
        { regex: /\b(let|var|func|class|struct|if|else|for|while|return|import|public|private|fileprivate|internal|enum|case|switch|do|catch|try|guard|defer|init|self)\b/g, className: 'keyword' }, // Keywords
        { regex: /\/\/.*/g, className: 'comment' }, // Single-line comments
        { regex: /\/\*[\s\S]*?\*\//g, className: 'comment' }, // Multi-line comments
        { regex: /\b\d+(\.\d+)?\b/g, className: 'number' }, // Numbers
        { regex: /\b[A-Z][A-Za-z0-9_]*\b/g, className: 'type' }, // Type names (starting with capital letters)
        { regex: /\b(self|super|true|false|nil)\b/g, className: 'constant' }, // Special variables and literals
    ];

    if (code.length === 0) {
        return code;
    }

    patterns.forEach(({ regex, className }) => {

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

const forLanguage = (language: string, code:string): string => {
    if (language === 'swift') {
        return _swift(code);
    }
    // untouched
    return code;
};


export const $Highlighter = {
    forLanguage
} ;