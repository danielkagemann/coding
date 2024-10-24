import {useEffect, useState} from "react";

export const useTypewriter = (text: string, speed: number) => {
    const [currentText, setCurrentText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeoutId = setTimeout(() => {
                // Füge das nächste Zeichen hinzu und erhöhe den Index
                setCurrentText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, speed);

            // Clear Timeout beim Umounting oder wenn sich der Index ändert
            return () => clearTimeout(timeoutId);
        }
    }, [index, text, speed]);

    return currentText;
}