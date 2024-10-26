import {
    ConfigurationSlide,
    estimatedTotalLines,
    getActionPlaceholders,
} from "../model/Configuration.ts";
import {FC, ReactElement, useEffect, useState} from "react";
import {useActions} from "../model/useActions.ts";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";

type Props = {
    slide: ConfigurationSlide
};

const Terminal: FC<Props> = ({slide}) => {
    const [code, setCode] = useState<string>('');
    const $actions = useActions(slide, () => {
        const next = $actions.index + 1;
        console.log('update to next step', next);
        if (next < slide.code.actions.length) {
            const block: string = getCodeBlockTo($actions.index + 1);
            setCode(block);
        } else {
            console.log('done');
        }
    });

    function getCodeBlockTo(current: number): string {
        let finalString: string = "";
        const placeholders: Record<string, string> = getActionPlaceholders(slide, current);

        // iterate until index
        for (let index = 0; index < current; index += 1) {
            const {type, text, where} = slide.code.actions[index];

            // only inserts
            if (type === "insert") {
                // replace all existing placeholders in this
                if (where === "") {
                    finalString = text;
                }

                for (const pl in placeholders) {
                    finalString = finalString.replace(new RegExp(pl, 'g'), placeholders[pl]);
                }
            }
        }
        return finalString;
    }

    useEffect(() => {
        hljs.highlightAll();
        const block: string = getCodeBlockTo(0);
        setCode(block);
    }, []);

    function currentCodeBlock(): string {
        const {type, where} = slide.code.actions[$actions.index];

        if (type === 'insert') {
            const ele = code.replace(where as string, $actions.typer.value);
            return hljs.highlight(
                ele,
                {language: slide.code.language}
            ).value
        }
        return '';
    }

    function renderLineNumbers(): ReactElement | null {
        if (!slide.code.linenumbers) {
            return null;
        }
        const lines = Array(estimatedTotalLines(slide)).fill(0).map((_, index) => `${index + 1}`);
        return (
            <div className={'numbers'}>
                    <pre><code>
                        {lines.join('\n')}
                    </code></pre>
            </div>
        );
    }

    return (
        <div className="terminal" style={{width: slide.code.width}}>
            <div className="header">
                {slide.code.showMenu && <div className={"menu"}>
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                </div>
                }
                <span className={'title'}>{slide.code.title}</span>
            </div>

            {
                slide.code.linenumbers && <div className={"numbersarea"}/>
            }

            <div className="code--container">
                {renderLineNumbers()}
                <div className="code">
                <pre>
                    <code dangerouslySetInnerHTML={{__html: currentCodeBlock()}}/>
                </pre>
                </div>
            </div>
        </div>
    );
}

export default Terminal;