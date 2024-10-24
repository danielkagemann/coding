import {CodeStep} from "./Configuration.ts";
import {useEffect, useState} from "react";
import {useTypewriter} from "./useTypewriter.ts";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const useCodeSteps = (steps: CodeStep[], callback: Function) => {
    const [index, setIndex] = useState<number>(0);
    const typer = useTypewriter();

    useEffect(() => {
        // the index changed
        if (index < steps.length) {
            typer.update(steps[index].text, steps[index].speed, () => {
                setTimeout(() => {
                    callback();
                    setIndex((id) => id + 1);
                }, steps[index].wait * 1000)
            });
        }
    }, [index]);

    return {
        step: index,
        typer
    }
};