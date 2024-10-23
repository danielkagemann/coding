import {useEffect, useState} from "react";
import {Configuration, scheme} from "./model/Configuration.ts";
import Slide from "./components/Slide.tsx";

function App() {
    const [config, setConfig] = useState<Configuration>({} as Configuration);

    function fetchData() {
        fetch("slides.json")
            .then(response => response.json())
            .then(json => {
                setConfig(scheme.parse(json));
            });
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (scheme.safeParse(config).error) {
        return <div>loading data...</div>;
    }

    return (
        <Slide config={config}/>
    )
}

export default App
