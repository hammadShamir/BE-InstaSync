import { Request, Response, NextFunction } from "express";
import { IResponse } from "../utils/interfaces/response";

// Middleware handler function
const handler = async (req: Request, res: Response, next: NextFunction) => {
  // Initialize the response body as an IResponse object
  const responseBody: IResponse = {
    meta: {
      status: res.statusCode || 200,
      message: res.locals.message || "success",
    },
    data: res.locals.data,
  };

  // If pagination information exists, add it to the response
  if (res.locals.pagination) {
    responseBody.meta.limit = res.locals.pagination.limit;
    responseBody.meta.offset = res.locals.pagination.offset;
    responseBody.meta.totalCount = res.locals.pagination.totalCount;
  }

  // If unread count exists, add it to the response
  if (res.locals.unreadCount) {
    responseBody.meta.unreadCount = res.locals.unreadCount;
  }

  // Set the response body
  res.json(responseBody);

  // Call the next middleware
  next();
};

// Export the middleware
export default handler;
