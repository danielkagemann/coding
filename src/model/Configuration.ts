import {z} from "zod";

export const insertionSchema = z.object({
    pos: z.number(),
    text: z.string()
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
        delay: z.number().int().min(0).max(5).default(0),
        animation: z.string()
    }).optional(),
    subline: z.object({
        text: z.string(),
        delay: z.number().int().min(0).max(5).default(0),
        animation: z.string()
    }).optional(),
    code: z.object({
        text: z.string().default(""),
        language: z.string(),
        speed: z.number().default(50),
        insertions: z.array(insertionSchema).optional()
    }),
    next: z.number().int().min(0).max(5).default(2),
});

export const scheme = z.array(
    slideSchema
);

export type Configuration = z.infer<typeof scheme>;
export type ConfigurationSlide = z.infer<typeof slideSchema>;