import { Response, Request, NextFunction } from "express";
import { UserRoles } from "../utils/constant/user";
import { throwErrorIfUserNotExist } from "../validation/auth";
import { badRequest, forbidden } from "@hapi/boom";
import { asyncHandler } from "./asyncHandler";

const cache: Record<string, any> = {}; // Define cache type for clarity

export const permissionMiddleware = (...allowed: UserRoles[]) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.cognitoUser;

    if (!user) {
      throw forbidden("User not found in request context");
    }

    const { role: userRole, email } = user;

    if (!allowed.includes(userRole)) {
      throw forbidden("This action is not allowed for your account type");
    }

    // Use cached role if available
    if (!cache[userRole]) {
      const role = await throwErrorIfUserNotExist({ role: userRole, email });
      if (!role) {
        throw badRequest("Invalid role");
      }
      cache[userRole] = role;
    }

    res.locals.role = cache[userRole];
    next();
  });
