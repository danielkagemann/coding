import { FC, useEffect, useState } from "react";
import {$Highlighter} from "../model/highlighter.ts";

type Props = {
  text: string,
    language: string,
  speed: number
};

const TypeWriter:FC<Props> = ({text, language, speed = 30}) => {
      const [index, setIndex] = useState<number>(0);

     useEffect(() => {
         if  (index < text.length) {
             setTimeout(() => {
                 setIndex( index + 1)
             }, speed);
         }
     }, [index, speed, text.length]);

    return <pre>
        <code dangerouslySetInnerHTML={{__html: $Highlighter.forLanguage(language,text.substring(0, index))}} />
    </pre>;
}

export default TypeWriter;