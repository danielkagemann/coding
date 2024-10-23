import {useEffect, useState} from "react";
import {Configuration, scheme} from "./model/Configuration.ts";
import Slide from "./components/Slide.tsx";

const DURATION = 1000;

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

    const sl = config[index];
    const delay: number = sl ? ((sl.headline?.delay ?? 0) * 1000 +
        (sl.headline ? DURATION : 0) +
        (sl.subline?.delay ?? 0) * 1000 +
        (sl.subline ? DURATION : 0) +
        sl.code.text.length * sl.code.speed +
        (sl.next * 1000)) : 0;

    useEffect(() => {
        if (index >= 0) {
            // calculate the time to wait until going to the next
            console.log(`waiting for ${delay}ms before next slide`);
            setTimeout(() => {
                if (index + 1 < config.length) {
                    setIndex((id) => id + 1);
                }
            }, delay);
        }
    }, [index]);

    if (scheme.safeParse(config).error) {
        return <div>loading data...</div>;
    }

    return (
        <>
            <Slide data={config[index]}/>
            <div className={'timeuntilnext'}
                 key={`timer-${index}`}>
                <div className={'state'}
                     style={{
                         animationDuration: `${delay}ms`,
                         animationName: 'progress',
                         animationFillMode: 'forwards',
                         backgroundColor: `${sl.style.text}`
                     }}/>
            </div>
        </>
    )
}

export default App
