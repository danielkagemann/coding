import Typewriter from './Typewriter.tsx';
import {Configuration} from "../model/Configuration.ts";
import {FC} from "react";

type Props = {
    config: Configuration
};

const Terminal: FC<Props> = ({config}) => {

    return (
        <div className="mac--window" style={{width: config.window.width}}>
            <div className="header">
                {config.window.menu && <div className={"menu"}>
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                </div>
                }
                <span className={'title'}>{config.window.title}</span>
            </div>

            <div className="code">
                <Typewriter text={config.code.text} language={config.code.language} speed={config.code.speed}/>
            </div>
        </div>
    );
}


export default Terminal;