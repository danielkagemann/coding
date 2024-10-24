import {ConfigurationSlide} from "../model/Configuration.ts";
import {FC, useEffect, useState} from "react";
import {$Highlighter} from "../model/Highlighter.ts";
import {useCodeSteps} from "../model/useCodeSteps.ts";

type Props = {
    data: ConfigurationSlide
};

const Terminal: FC<Props> = ({data}) => {
    const [code, setCode] = useState<string>('');
    const stepper = useCodeSteps(data.code.steps, () => {
        setCode(updateCode(stepper.step + 1));
    });

    function updateCode(current: number) {
        // all before current should be filled with the steps.text
        // the current should be untouched
        // all following should be removed
        let ele = data.code.initial;
        data.code.steps.forEach((_, index) => {
            if (index < current) {
                ele = ele.replace(`_${index + 1}_`, data.code.steps[index].text);
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
                <pre>
                    <code
                        dangerouslySetInnerHTML={{__html: $Highlighter.forLanguage(data.code.language, dynamicCode())}}/>
                </pre>
            </div>
        </div>
    );
}

export default Terminal;