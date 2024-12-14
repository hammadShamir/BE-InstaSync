import { NextFunction, Request, Response } from "express";
import * as user from "./service";
import { IUserSignUp, IUserSignIn } from "../../utils/interfaces/user";
import { UserRoles } from "../../utils/constant/user";

export const signIn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const payload: IUserSignIn = {
    email: request.body.email,
    password: request.body.password,
  };
  response.locals.data = await user.signIn(payload);
  response.locals.message = "Sign In Successfully";
  next();
};

export const signUp = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const payload: IUserSignUp = {
    fullName: request.body.fullName,
    email: request.body.email,
    role: request.body.role || UserRoles.USER,
    password: request.body.password,
  };
  response.locals.data = await user.signUp(payload);
  response.locals.message = "User registered successfully";
  next();
};
