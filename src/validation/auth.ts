import { badRequest } from "@hapi/boom";
import { IUserSignUp } from "../utils/interfaces/user";
import { getUser } from "../app/auth/repostries";
import { compare } from "bcrypt";

export const throwErrorIfUserAlreadyExist = async (
  payload: Partial<IUserSignUp>
) => {
  const user = await getUser(payload);
  if (user) {
    throw badRequest("User Already exist");
  }
};
export const throwErrorIfUserNotExist = async (
  payload: Partial<IUserSignUp>
) => {
  const user = await getUser(payload);
  if (!user) {
    throw badRequest("User does not exist.");
  }
  return user;
};

export const throwErrorIfPasswordNotMatch = async (
  password: string,
  hash: string
) => {
  const isMatch = await compare(password, hash);
  if (!isMatch) {
    throw new Error("Password does not match");
  }
};
