import {useEffect, useState} from "react";

export const useTypewriter = () => {
    const [data, setData] = useState(
        {text: '', speed: 0.2, index: 0, value: '', callback: Function}
    );

    useEffect(() => {
        if (data.index < data.text.length) {
            setTimeout(() => {
                const tmp = {...data};
                tmp.value += tmp.text[tmp.index];
                tmp.index += 1;
                setData(tmp)
            }, data.speed * 1000);
        } else {
            data.callback()
        }
    }, [data]);

    return {
        value: data.value,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        update: (text: string, speed: number, callback: Function) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setData({text: text.replace(/(_[0-9]_)/g, ''), speed, value: '', index: 0, callback});
        }
    }
}