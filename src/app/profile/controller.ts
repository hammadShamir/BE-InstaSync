import { NextFunction, Request, Response } from "express";
import * as profile from "./service";

import { IAddPost, IGetPost, IProfile } from "../../utils/interfaces/profile";
import { ICognitoUser } from "../../utils/interfaces/cognito";

export const UpdateProfile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user: ICognitoUser = response.locals.cognitoUser;
  console.log(user, "1tes");
  const payload: IProfile = {
    id: user.id,
    fullName: request.body.fullName,
    email: request.body.email,
    role: request.body.role,
    password: request.body.password,
    access_token: request.body.access_token,
  };
  response.locals.data = await profile.UpdateProfile(payload);
  response.locals.message = "Profile Update Successfully";
  next();
};

export const getProfilePost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user: ICognitoUser = response.locals.cognitoUser;
  console.log(user, "test");
  const payload: IGetPost = {
    access_token: user.access_token,
  };

  console.log(payload);
  response.locals.data = await profile.getProfilePost(payload);
  next();
};

export const addProfilePost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user: ICognitoUser = response.locals.cognitoUser;
  const payload: IAddPost = {
    image_url: request.body.image_url,
    caption: request.body.caption,
    access_token: user.access_token,
  };
  response.locals.data = await profile.addProfilePost(payload);
  next();
};
