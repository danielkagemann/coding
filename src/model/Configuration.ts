import { z } from "zod";

export const scheme = z.object({
    title: z.object({
            text: z.string(),
        delay:z.number().int().min(0).max(5),
            animation: z.string()
            }).optional(),
    subline: z.object({
        text: z.string(),
        delay:z.number().int().min(0).max(5),
        animation: z.string()
    }).optional(),
    background: z.string().default("#242424"),
    text: z.string().default("#eee"),
    code: z.object({
        text: z.string().default(""),
        language: z.string(),
        speed: z.number().default(50)
    })
});

export type Configuration = z.infer<typeof scheme>;