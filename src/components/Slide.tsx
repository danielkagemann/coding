import {FC} from "react";
import { ConfigurationSlide} from "../model/Configuration.ts";
import Markdown from 'react-markdown'
import Terminal from "./Terminal.tsx";

type Props = {
    data: ConfigurationSlide
}
const Slide: FC<Props> = ({data}) => (
    <main className={`bg-${data.style.background}`} style={{color: data.style.text}}>
        {
            data.headline &&
            <div
                className={`headline animate__animated animate__${data.headline.animation} animate__delay-${data.headline.delay}s`}>
                <Markdown>{data.headline.text}</Markdown></div>
        }
        <Terminal data={data}/>
        {
            data.subline &&
            <div
                className={`subline animate__animated animate__${data.subline.animation} animate__delay-${data.subline.delay}s`}>
                <Markdown>{data.subline.text}</Markdown></div>
        }

    </main>
);

export default Slide;