import {z} from "zod";

export const stepSchema = z.object({
    text: z.string(),
    speed: z.number().default(0.1),
    wait: z.number().min(0).max(5).default(1)
})

export const slideSchema = z.object({
    terminal: z.object({
        menu: z.boolean().default(true),
        title: z.string().default(""),
        width: z.string().default("auto"),
        linenumbers: z.boolean().optional().default(false),
        language: z.string().default("text"),
        initial: z.string().default(""),
        steps: z.array(stepSchema).default([])
    }).default({}),
    style: z.object({
        background: z.string().default("default"),
        text: z.string().default("#eee")
    }).default({}),
    headline: z.object({
        text: z.string(),
        animation: z.string()
    }).optional(),
    subline: z.object({
        text: z.string(),
        animation: z.string()
    }).optional(),
    next: z.number().int().min(0).max(5).default(2),
});

export const scheme = z.array(
    slideSchema
);

export type Configuration = z.infer<typeof scheme>;
export type ConfigurationSlide = z.infer<typeof slideSchema>;
export type CodeStep = z.infer<typeof stepSchema>;

export function estimatedSlideDuration (slide: ConfigurationSlide): number {
    let duration = 0;
    slide.terminal.steps.forEach((sl) => {
        duration += (sl.wait * 1000);
        duration += sl.text.length * (sl.speed * 1000);
    })

    duration += slide.next * 1000;
    console.log(`estimated time for slide is ${duration}ms`);
    return duration;
}

export function estimatedTotalLines (slide: ConfigurationSlide): number {
    // go through the slides and dry run the steps
    let text = slide.terminal.initial;
    slide.terminal.steps.forEach ((st, index) => {
        text = text.replace(`_${index+1}_`, st.text);
    });
    return text.split('\n').length;
}