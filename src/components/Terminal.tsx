import Typewriter from './Typewriter.tsx';
import {ConfigurationSlide} from "../model/Configuration.ts";
import {FC, useEffect, useState} from "react";
import {$Highlighter} from "../model/Highlighter.ts";

type Props = {
    data: ConfigurationSlide
};

const Terminal: FC<Props> = ({data}) => {
    const insertions = data.code.insertions;
    const [index, setIndex] = useState<number>(-1);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (index === -1) {
            setValue(data.code.text);
            if (insertions) {
                setTimeout(() => {
                    setIndex(0);
                }, 2000);
            }
        } else {
            const list = insertions ?? [];
            const {pos, text} = list[index];
            const newValue = value.substring(0, pos) + text + value.substring(pos);
            setValue(newValue);
            if (index < list?.length - 1) {
                setTimeout(() => {
                    setIndex((id) => id + 1);
                }, 2000);   // TODO delay is
            }
        }
    }, [index]);

    const renderCode = () => {
        if (!insertions) {
            return <pre><Typewriter text={value} language={data.code.language} speed={data.code.speed}/></pre>;
        }
        return <pre>
            <code dangerouslySetInnerHTML={{__html: $Highlighter.forLanguage(data.code.language, value)}}/>
        </pre>
    };

    return (
        <div className="mac--window" style={{width: data.terminal.width}}>
            <div className="header">
                {data.terminal.menu && <div className={"menu"}>
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                </div>
                }
                <span className={'title'}>{data.terminal.title}</span>
            </div>

            <div className="code">
                {renderCode()}
            </div>
        </div>
    );
}


export default Terminal;