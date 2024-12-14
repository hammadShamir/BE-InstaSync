import { unauthorized } from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { validateLocalToken } from "../app/auth/authorization";
import { ICognitoUser } from "../utils/interfaces/cognito";
import { throwErrorIfUserNotExist } from "../validation/auth";
import { asyncHandler } from "./asyncHandler";
export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers.token ||
      req.query.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      throw unauthorized("token not provide");
    }

    const localToken = await validateLocalToken(token as string);

    if (!localToken) {
      throw unauthorized("invalid token");
    }
    let decodedJWT: ICognitoUser = localToken;

    const user = await throwErrorIfUserNotExist({ email: decodedJWT.email });

    const cognitoUserPayload: ICognitoUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };

    res.locals.cognitoUser = cognitoUserPayload;

    await next();
  }
);
