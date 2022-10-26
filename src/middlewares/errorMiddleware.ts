import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
