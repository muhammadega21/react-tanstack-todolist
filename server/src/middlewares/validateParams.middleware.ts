import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const formatted = result.error.format();
      const errors: Record<string, string> = {};

      Object.entries(formatted).forEach(([key, value]) => {
        if (key === "_errors") return;
        const fieldError = value as { _errors: string[] };
        if (fieldError?._errors?.length > 0) {
          errors[key] = fieldError._errors[0];
        }
      });

      return res.status(400).json({
        success: false,
        message: "Invalid params",
        errors,
      });
    }

    req.params = result.data as any;

    next();
  };
};
