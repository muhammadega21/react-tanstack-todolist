import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce
    .number({
      error: () => "ID must be a number",
    })
    .int("ID must be an integer")
    .positive("ID must be a positive number"),
});

const createTodoSchema = z.object({
  title: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .min(4, "Title must be at least 4 characters long"),
  completed: z.boolean().optional(),
});

const updateTodoSchema = z.object({
  title: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .min(4, "Title must be at least 4 characters long")
    .optional(),
  completed: z.boolean().optional(),
});

export type IdParamInput = z.infer<typeof idParamSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

export { createTodoSchema, updateTodoSchema };
