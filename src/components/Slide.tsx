import {FC} from "react";
import {ConfigurationSlide} from "../model/Configuration.ts";
import Markdown from 'react-markdown'
import Terminal from "./Terminal.tsx";

type Props = {
    data: ConfigurationSlide,
    duration: number
}
const Slide: FC<Props> = ({data, duration}) => (
    <main className={`background ${data.style.background}`} style={{color: data.style.text}} key={new Date().getTime()}>
        {
            data.headline &&
            <div
                className={`headline animate__animated animate__${data.headline.animation}`}>
                <Markdown>{data.headline.text}</Markdown></div>
        }
        <Terminal data={data}/>
        {
            data.subline &&
            <div
                className={`subline animate__animated animate__${data.subline.animation}`}>
                <Markdown>{data.subline.text}</Markdown></div>
        }
        <div className={'timeuntilnext'}>
            <div className={'state'}
                 style={{
                     animationDuration: `${duration}ms`,
                     animationName: 'progress',
                     animationFillMode: 'forwards',
                     backgroundColor: `${data.style.text}`
                 }}/>
        </div>
    </main>
);

export default Slide;