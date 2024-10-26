import {useEffect, useState} from "react";
import {useTypewriter} from "./useTypewriter.ts";
import {ConfigurationSlide, getActionPlaceholders, removePlaceholders, TYPEWRITERSPEED} from "./Configuration.ts";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const useActions = (slide: ConfigurationSlide, callback: Function) => {
    const [index, setIndex] = useState<number>(0);
    const typer = useTypewriter();

    useEffect(() => {
        // the index changed
        if (index < slide.code.actions.length) {
            const placeholders = getActionPlaceholders(slide);
            const text = removePlaceholders(slide.code.actions[index].text, placeholders);

            typer.update(text, TYPEWRITERSPEED, () => {
                setTimeout(() => {
                    callback();
                    const next = index + 1;
                    if (next < slide.code.actions.length) {
                        setIndex(next);
                    }
                },  slide.code.actions[index].wait * 1000)
            });
        }
    }, [index]);

    return {
        index,
        typer
    }
};