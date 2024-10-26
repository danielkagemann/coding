import {useEffect, useState} from "react";
import {Configuration, scheme} from "./model/Configuration.ts";
import Slide from "./components/Slide.tsx";

function App() {
    const [config, setConfig] = useState<Configuration | null>(null);
    const [index, setIndex] = useState<number>(-1);
    const [errors, setErrors] = useState<string[]>([]);

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
            // TODO next slide
            /*if (index + 1 < config.length) {
                setTimeout(() => {
                    setIndex(index + 1);
                }, estimatedSlideDuration(config[index]));
            }*/
        }
    }, [index]);

    if (errors.length > 0) {
        return <pre><code>
            we have some errors in configuration file
            {errors.map((err) => `${err}\n`)}
        </code></pre>;
    }

    if (config ===null) {
        return <div>loading configuration</div>
    }

    return (
        <Slide slide={config[index]} />
    )
}

export default App
