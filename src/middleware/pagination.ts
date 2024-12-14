import { NextFunction, Request, Response } from "express";
import { LIMIT, OFFSET } from "../utils/constant/pagination";

const paginationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "GET") {
    res.locals.pagination = {
      limit: req.query.limit || LIMIT,
      offset: req.query.offset || OFFSET,
    };

    if (res.locals.pagination.limit < 0) {
      res.locals.pagination.limit = LIMIT;
    }
    if (res.locals.pagination.offset < 0) {
      res.locals.pagination.offset = OFFSET;
    }
  }
  next();
};

export default paginationMiddleware;
