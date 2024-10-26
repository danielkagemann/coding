import {FC} from "react";
import {ConfigurationSlide} from "../model/Configuration.ts";
import Markdown from 'react-markdown'
import Terminal from "./Terminal.tsx";

type Props = {
    slide: ConfigurationSlide
}
const Slide: FC<Props> = ({slide}) => (
    <main className={`background ${slide.config.background}`} style={{color: slide.config.text}} key={new Date().getTime()}>
        {
            slide.header &&
            <div
                className={`header ${slide.header.align} animate__animated animate__${slide.header.animate}`}>
                <Markdown>{slide.header.text}</Markdown></div>
        }
        <Terminal slide={slide}/>
        {
            slide.footer &&
            <div
                className={`footer ${slide.footer.align} animate__animated animate__${slide.footer.animate}`}>
                <Markdown>{slide.footer.text}</Markdown></div>
        }

    </main>
);

export default Slide;