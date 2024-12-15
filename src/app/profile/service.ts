import { validate } from "../../utils/Schema/index";
import * as profile from "./repostries";
import * as user from "../auth/repostries";
import { throwErrorIfUserNotExist } from "../../validation/auth";
import {
  addPostProfileSchema,
  getProfileSchema,
  updateProfileSchema,
} from "../../utils/Schema/profile";
import { deleteKeyIfEmptyorNull } from "../../helper/common-helper";
import { IAddPost, IGetPost, IProfile } from "../../utils/interfaces/profile";

export const UpdateProfile = async (payload: IProfile) => {
  payload = deleteKeyIfEmptyorNull(payload);
  payload = await validate(payload, updateProfileSchema);
  await throwErrorIfUserNotExist({ email: payload.email });
  return user.updateUser({ id: payload.id }, payload);
};

export const getProfilePost = async (payload: IGetPost) => {
  payload = await validate(payload, getProfileSchema);
  return await profile.getPosts(payload);
};

export const addProfilePost = async (payload: IAddPost) => {
  payload = await validate(payload, addPostProfileSchema);
  return await profile.AddPost(payload);
};
