// validate.ts
import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/response';

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next(); // If validation succeeds, proceed to the next middleware or controller
  } catch (e: any) {
    sendErrorResponse(res, e.message || "Validation Error", 400); // 500 is an example status code for server errors

    // return res.status(400).json({
    //   status: 'error',
    //   errors: e.errors, // Return validation errors to the client
    // });
  }
};

export default validate;
