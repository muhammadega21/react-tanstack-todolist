import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const formatted = result.error.format();
      const errors: Record<string, string> = {};

      Object.entries(formatted).forEach(([key, value]) => {
        if (key === "_errors") return; // skip root errors
        const fieldError = value as { _errors: string[] };
        if (fieldError?._errors?.length > 0) {
          errors[key] = fieldError._errors[0];
        }
      });

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    req.body = result.data;
    next();
  };
};

export { validateRequest };
