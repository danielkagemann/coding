import {useEffect, useState} from "react";
import {Configuration, estimatedSlideDuration, scheme} from "./model/Configuration.ts";
import Slide from "./components/Slide.tsx";

// const DURATION = 1000;

function App() {
    const [config, setConfig] = useState<Configuration>({} as Configuration);
    const [index, setIndex] = useState<number>(-1);

    function fetchData() {
        fetch("slides.json")
            .then(response => response.json())
            .then(json => {
                setConfig(scheme.parse(json));
                setIndex(0);
            });
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        if (index + 1 < config.length) {
            setTimeout(() => {
                setIndex(index + 1);
            }, estimatedSlideDuration(config[index]));
        }
    }, [index]);

    if (scheme.safeParse(config).error) {
        return <div>loading data...</div>;
    }


    return (
        <Slide data={config[index]} duration={estimatedSlideDuration(config[index])}/>
    )
}

export default App
