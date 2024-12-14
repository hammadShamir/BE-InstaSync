import { NextFunction, Request, Response } from "express";

export const notFoundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.data) {
    res.statusCode = 404;
    res.locals.message = "Data not found " + req.originalUrl;
  }
  await next();
};
