import { unauthorized } from "@hapi/boom";
import { verify, sign } from "jsonwebtoken";
import { ICognitoUser } from "../../utils/interfaces/cognito";

export const validateLocalToken = async (token: string) => {
  try {
    verify(token, process.env.JWT_SECRET_KEY, { ignoreExpiration: false });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw unauthorized("Token Expired");
    }
    throw unauthorized("Token Invaild");
  }
  const decodedJwt: any = verify(token, process.env.JWT_SECRET_KEY);
  return decodedJwt.payload;
};

export const generateAccessToken = async (payload: any) => {
  const user: ICognitoUser = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
    fullName: payload.fullName,
  };
  return sign(user, "ERRGFGF");
};
