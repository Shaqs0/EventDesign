import { z } from "zod";

export const createDesignEvDto = z.object({
    text: z.string().min(1, 'Text is requires').max(280),
})