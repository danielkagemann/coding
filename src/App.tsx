import {useEffect, useRef, useState} from "react";
import {Configuration, estimateSlideDuration, scheme} from "./model/Configuration.ts";
import Slide from "./components/Slide.tsx";

function App() {
    const [config, setConfig] = useState<Configuration | null>(null);
    const [index, setIndex] = useState<number>(-1);
    const [errors, setErrors] = useState<string[]>([]);
    const duration = useRef(0);

    function fetchData() {
        setErrors([]);
        fetch("slides.json")
            .then(response => response.json())
            .then(json => {
                const result = scheme.safeParse(json);
                if (!result.success) {
                    setErrors(
                        result.error.issues.map((err) => `/${err.path.join('.')} = ${err.message}`)
                    );
                } else {
                    console.log(JSON.stringify(result.data, null, 2));
                    setConfig(result.data);
                    setIndex(0);
                }
            });
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        if (config !== null) {
            duration.current = estimateSlideDuration(config[index]);
            console.log(`duration is ${duration.current}`);
            if (index + 1 < config.length) {
                setTimeout(() => {
                    setIndex(index + 1);
                }, duration.current);
            }
        }
    }, [index]);

    if (errors.length > 0) {
        return <pre><code>
            we have some errors in configuration file
            {errors.map((err) => `${err}\n`)}
        </code></pre>;
    }

    if (config === null) {
        return <div>loading configuration</div>
    }

    return (
        <>
            <Slide slide={config[index]}/>
            {
                config[index].config.showProgress &&
                <div className={'slide--progress'}>
                    <div className={'state'}
                         style={{
                             animationDuration: `${duration.current}ms`,
                             animationName: 'slideProgress',
                             animationFillMode: 'forwards',
                             backgroundColor: `${config[index].config.text}`
                         }}/>
                </div>
            }
        </>
    )
}

export default App
