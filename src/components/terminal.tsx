import TypeWriter from './typewriter.tsx';
import {Configuration} from "../model/Configuration.ts";
import {FC} from "react";

type Props = {
    config: Configuration
};

const Terminal: FC<Props> = ({config}) => {

    return (
        <div className="mac--window">
            <div className="header">
                <div className="dot"/>
                <div className="dot"/>
                <div className="dot"/>
            </div>

            <div className="code">
                <TypeWriter text={config.code.text} language={config.code.language} speed={config.code.speed}/>
            </div>
        </div>
    );
}


export default Terminal;