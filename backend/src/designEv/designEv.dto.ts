import { z } from "zod";

export const createDesignEvDto = z.object({
  event_name: z.string().min(1, "Event name is required").max(255),
  category: z.string().optional(),
  event_date: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val).toISOString() : val),
    z.string().optional()  
  ),
  location: z.string().max(255).optional(),
  description: z.string().max(1024).optional(),
  note: z.string().max(255).optional(),
  title: z.string().max(45).optional().default("Без названия"),
  favorite: z.boolean().optional(),
});

export const createCategoryDto = z.object({
  name: z.string().min(2, "Название категории должно содержать минимум 2 символа"),
});
