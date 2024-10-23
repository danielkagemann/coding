import {z} from "zod";

export const scheme = z.object({
    window: z.object({
        menu: z.boolean().default(true),
        title: z.string().default(""),
        width: z.string().default("auto")
    }).default({}),
    title: z.object({
        text: z.string(),
        delay: z.number().int().min(0).max(5),
        animation: z.string()
    }).optional(),
    subline: z.object({
        text: z.string(),
        delay: z.number().int().min(0).max(5),
        animation: z.string()
    }).optional(),
    style: z.object({
        background: z.string().default("default"),
        text: z.string().default("#eee")
    }).default({}),
    code: z.object({
        text: z.string().default(""),
        language: z.string(),
        speed: z.number().default(50)
    })
});

export type Configuration = z.infer<typeof scheme>;