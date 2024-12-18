import {z} from "zod";

const ALIGNMENTS = ["left", "center", "right"] as const;

export const TYPEWRITERSPEED = 0.03;

export const configScheme = z.object({
    background: z.string().default('dark'),
    text: z.string().default('#eee'),
    showProgress: z.boolean().optional().default(true)
});

export const textScheme = z.object({
    text: z.string().default(""),
    align: z.enum(ALIGNMENTS).optional().default('center'),
    animate: z.string().optional().default('fadeIn')
});

export const wherePlaceholder = z.string({invalid_type_error: "Define a placeholder like _<nameofplaceholder>_"});
export const whereHighlight = z.array(z.number());

export const actionScheme = z.object({
    type: z.enum(['insert', 'highlight']).default('insert'),
    where: wherePlaceholder.or(whereHighlight),
    text: z.string().default(""),
    wait: z.number().default(1)
});

export const codeScheme = z.object({
    language: z.string().default("text"),
    showMenu: z.boolean().default(true),
    appearance: z.enum(["light", "dark"]).optional().default("dark"),
    linenumbers: z.boolean().default(false),
    title: z.string().default(""),
    align: z.enum(ALIGNMENTS).optional().default("center"),
    width: z.string().default("auto"),
    actions: z.array(actionScheme)
});

export const slideScheme = z.object({
    config: configScheme,
    header: textScheme,
    footer: textScheme,
    code: codeScheme
});

export const scheme = z.array(slideScheme);

export type Configuration = z.infer<typeof scheme>;
export type ConfigurationSlide = z.infer<typeof slideScheme>;
export type ConfigurationAction = z.infer<typeof actionScheme>;

export function estimatedTotalLines(slide: ConfigurationSlide): number {
    // go through the slides and dry run the steps
    const placeholders: Record<string, string> = getActionPlaceholders(slide);

    let text = '';
    slide.code.actions
        .filter((item) => item.type === 'insert')
        .forEach((st) => {
            // replace all existing placeholders in this
            if (st.where === "") {
                text = st.text;
            }

            for (const pl in placeholders) {
                text = text.replace(new RegExp(pl, 'g'), placeholders[pl]);
            }
            text = text.replace(`_${st.where}_`, st.text);
        });
    return text.split('\n').length;
}

export function estimateSlideDuration(slide: ConfigurationSlide): number {
    return slide.code.actions.reduce((pr, c) => {
        let dur = 0;
        if (c.type === 'insert') {
            dur += c.text.length * (TYPEWRITERSPEED * 1000);
        }
        dur += (c.wait * 1000);
        return pr + dur;
    }, 0);
}

export function getActionPlaceholders(slide: ConfigurationSlide, last: number = -1): Record<string, string> {
    const pl: Record<string, string> = {};
    for (let i = 0; i < (last === -1 ? slide.code.actions.length : last); i += 1) {
        const {where, text, type} = slide.code.actions[i];
        if (type === 'insert' && where !== "") {
            pl[where as string] = text;
        }
    }
    return pl;
}

export function removePlaceholders(value: string, placeholders: Record<string, string>): string {
    let final = value;
    for (const pl in placeholders) {
        final = final.replace(new RegExp(pl, 'g'), '');
    }
    return final;
}