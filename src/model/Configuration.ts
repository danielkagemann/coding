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
        width: z.string().default("auto")
    }).default({}),
    style: z.object({
        background: z.string().default("default"),
        text: z.string().default("#eee")
    }).default({}),
    headline: z.object({
        text: z.string(),
        wait: z.number().int().min(0).max(5).default(0),
        animation: z.string()
    }).optional(),
    subline: z.object({
        text: z.string(),
        wait: z.number().int().min(0).max(5).default(0),
        animation: z.string()
    }).optional(),
    code: z.object({
        language: z.string(),
        initial: z.string().default(""),
        steps: z.array(stepSchema)
    }),
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
    if (slide.headline) {
        duration += slide.headline.wait * 1000;
    }
    if (slide.subline) {
        duration += slide.subline.wait * 1000;
    }
    slide.code.steps.forEach((sl) => {
        duration += (sl.wait * 1000);
        duration += sl.text.length * (sl.speed * 1000);
    })

    duration += slide.next * 1000;
    console.log(`estimated time for slide is ${duration}ms`);
    return duration;
}