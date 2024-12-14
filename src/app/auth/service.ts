import { IUserSignIn, IUserSignUp } from "../../utils/interfaces/user";
import { validate } from "../../utils/Schema/index";
import { signInSchema, userSchema } from "../../utils/Schema/user";
import * as user from "./repostries";
import {
  throwErrorIfUserAlreadyExist,
  throwErrorIfUserNotExist,
  throwErrorIfPasswordNotMatch,
} from "../../validation/auth";
import { generateAccessToken } from "./authorization";
import { hashSync } from "bcrypt";

export const signIn = async (payload: IUserSignIn) => {
  payload = await validate(payload, signInSchema);
  const userInfo = await throwErrorIfUserNotExist({ email: payload.email });
  await throwErrorIfPasswordNotMatch(payload.password, userInfo.password);
  const token = await generateAccessToken(payload);
  return { token, ...userInfo };
};

export const signUp = async (payload: IUserSignUp) => {
  payload = await validate(payload, userSchema);
  await throwErrorIfUserAlreadyExist({ email: payload.email });
  payload.password = hashSync(payload.password, 10);
  const userInfo = await user.createUser(payload);
  const token = await generateAccessToken(payload);
  return { token, ...userInfo };
};
