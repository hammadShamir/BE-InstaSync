import Joi from "joi";

export const userSchema = Joi.object({
  fullName: Joi.string().min(4).max(25).required(),
  email: Joi.string().email().required().label("user.email"),
  password: Joi.string().required().label("user.password"),
  role: Joi.string().valid("user", "admin").required(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required().label("user.email"),
  password: Joi.string().required().label("user.password"),
});
