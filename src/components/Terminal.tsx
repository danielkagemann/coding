import Typewriter from './Typewriter.tsx';
import { ConfigurationSlide} from "../model/Configuration.ts";
import {FC} from "react";

type Props = {
    data: ConfigurationSlide
};

const Terminal: FC<Props> = ({data}) => {
    return (
        <div className="mac--window" style={{width: data.terminal.width}}>
            <div className="header">
                {data.terminal.menu && <div className={"menu"}>
                    <div className="dot"/>
                    <div className="dot"/>
                    <div className="dot"/>
                </div>
                }
                <span className={'title'}>{data.terminal.title}</span>
            </div>

            <div className="code">
                <Typewriter text={data.code.text} language={data.code.language} speed={data.code.speed}/>
            </div>
        </div>
    );
}


export default Terminal;