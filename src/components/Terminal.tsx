import {ConfigurationSlide, estimatedTotalLines} from "../model/Configuration.ts";
import {FC, ReactElement, useEffect, useState} from "react";
import {$Highlighter} from "../model/Highlighter.ts";
import {useCodeSteps} from "../model/useCodeSteps.ts";

type Props = {
    data: ConfigurationSlide
};

const Terminal: FC<Props> = ({data}) => {
    const [code, setCode] = useState<string>('');
    const stepper = useCodeSteps(data.terminal.steps, () => {
        setCode(updateCode(stepper.step + 1));
    });

    function updateCode(current: number) {
        // all before current should be filled with the steps.text
        // the current should be untouched
        // all following should be removed
        let ele = data.terminal.initial;
        data.terminal.steps.forEach((_, index) => {
            if (index < current) {
                ele = ele.replace(`_${index + 1}_`, data.terminal.steps[index].text);
            } else if (index > current) {
                ele = ele.replace(`_${index + 1}_`, '');
            }
        });
        return ele;
    }

    useEffect(() => {
        setCode(updateCode(0));
    }, []);

    function dynamicCode(): string {
        return code.replace(`_${stepper.step + 1}_`, stepper.typer.value);
    }

    function renderLineNumbers(): ReactElement | null {
        if (!data.terminal.linenumbers) {
            return null;
        }
        const lines = Array(estimatedTotalLines(data)).fill(0).map((_, index) => `${index + 1}`);
        return (
            <div className={'numbers'}>
                    <pre><code>
                        {lines.join('\n')}
                    </code></pre>
            </div>
        );
    }

    return (
        <div className="mac--terminal" style={{width: data.terminal.width}}>
            <div className="header">
                {data.terminal.menu && <div className={"menu"}>
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                </div>
                }
                <span className={'title'}>{data.terminal.title}</span>
            </div>

            {
                data.terminal.linenumbers && <div className={"numbersarea"}/>
            }

            <div className="code--container">
            {renderLineNumbers()}
                <div className="code">
                <pre>
                    <code
                        dangerouslySetInnerHTML={{__html: $Highlighter.forLanguage(data.terminal.language, dynamicCode())}}/>
                </pre>
                </div>
            </div>
        </div>
    );
}

export default Terminal;