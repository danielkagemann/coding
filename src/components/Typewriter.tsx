import {FC, useEffect, useState} from "react";
import {$Highlighter} from "../model/Highlighter.ts";

type Props = {
    text: string,
    language: string,
    speed: number
};

const Typewriter: FC<Props> = ({text, language, speed = 30}) => {
    const [index, setIndex] = useState<number>(0);

    // refresh
    useEffect(() => {
        setIndex(0);
    }, [text]);

    useEffect(() => {
        if (index < text.length) {
            setTimeout(() => {
                setIndex(index + 1)
            }, speed);
        }
    }, [index, speed, text.length]);

    return <code dangerouslySetInnerHTML={{__html: $Highlighter.forLanguage(language, text.substring(0, index))}}/>

}

export default Typewriter;