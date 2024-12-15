import { User } from "../../entity/User";
import { handleGetRequest, handlePostRequest } from "./axios";
import { instagramApi, instagramPublishAPI } from "../../utils/constant/thirdparty";
import { IAddPost, IProfile } from "../../utils/interfaces/profile";

export const getPosts = async (payload: IProfile): Promise<User> => {
  const filters = {
    fields: "id,caption,media_type,media_url,thumbnail_url,timestamp",
    access_token: payload.access_token,
  };
  return await handleGetRequest(instagramApi, filters);
};

export const AddPost = async (payload: IAddPost) => {
  const uploadPayload = {
    image_url: payload.image_url,
    caption: payload.caption,
    access_token: payload.access_token,
  };

  const uploadResponse = await handlePostRequest(
    instagramApi,
    uploadPayload
  );

  if (uploadResponse?.id) {
    const publishPayload = {
      creation_id: uploadResponse.id,
      access_token: payload.access_token,
    };

    const publishResponse = await handlePostRequest(
      instagramPublishAPI,
      publishPayload
    );

    return publishResponse;
  } else {
    throw new Error("Failed to upload Post. Please try again.");
  }
};
