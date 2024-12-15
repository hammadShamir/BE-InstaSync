import Joi from "joi";

export const updateProfileSchema = Joi.object({
  id: Joi.string().optional(),
  fullName: Joi.string().min(4).max(25).optional().label("user.fullName"),
  email: Joi.string().email().optional().label("user.email"),
  role: Joi.string().optional().label("user.role"),
  access_token: Joi.string().optional().label("user.accessToken"),
});

export const getProfileSchema = Joi.object({
  access_token: Joi.string().required().label("user.accessToken"),
});

export const addPostProfileSchema = Joi.object({
  image_url: Joi.string().required(),
  caption: Joi.string().required().optional(),
  access_token: Joi.string().optional(),
});
