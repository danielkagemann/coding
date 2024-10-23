import {FC} from "react";
import {Configuration} from "../model/Configuration.ts";
import Markdown from 'react-markdown'
import Terminal from "./terminal.tsx";

type Props = {
    config: Configuration
}
const Slide: FC<Props> = ({config}) => (
    <main style={{backgroundColor: config.background, color: config.text}}>
        {config.title &&
            <div className={`headline animate__animated animate__${config.title.animation} animate__delay-${config.title.delay}s`}><Markdown>{config.title.text}</Markdown></div>}
        <Terminal config={config}/>
        {config.subline &&
            <div className={`subline animate__animated animate__${config.subline.animation} animate__delay-${config.subline.delay}s`}><Markdown>{config.subline.text}</Markdown></div>}

    </main>
);

export default Slide;