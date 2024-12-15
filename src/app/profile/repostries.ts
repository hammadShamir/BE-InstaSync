import { User } from "../../entity/User";
import { handleGetRequest, handlePostRequest } from "./axios";
import { instagramApi } from "../../utils/constant/thirdparty";
import { IAddPost, IProfile } from "../../utils/interfaces/profile";
import { badRequest } from "@hapi/boom";

export const getPosts = async (payload: IProfile): Promise<User> => {
  const filters = {
    fields: "id,caption,media_type,media_url,thumbnail_url,timestamp",
    access_token: payload.access_token,
  };
  return await handleGetRequest(instagramApi, filters);
};

export const AddPost = async (payload: IAddPost) => {
  const uploadResponse = await handlePostRequest(instagramApi, payload);

  if (uploadResponse?.id) {
    const publishPayload = {
      creation_id: uploadResponse.id,
      access_token: payload.access_token,
    };
    const publishResponse = await handlePostRequest(
      instagramApi,
      publishPayload
    );

    return publishResponse;
  } else {
    throw badRequest("Failed to upload Post Please Try again");
  }
};
