import { unauthorized } from "@hapi/boom";
import { verify, sign } from "jsonwebtoken";
import { ICognitoUser } from "../../utils/interfaces/cognito";


export const validateLocalToken = async (token: string) => {
  try {
    // Verify the token and decode the payload in one step
    const decodedJwt = verify(token, process.env.JWT_SECRET_KEY, {
      ignoreExpiration: false,
    }) as any;
    return decodedJwt; // Return the decoded payload directly
  } catch (err) {
    // Handle token expiration and invalid token errors
    if (err.name === "TokenExpiredError") {
      throw unauthorized("Token Expired");
    }
    throw unauthorized("Token Invalid");
  }
};

export const generateAccessToken = async (payload: any) => {
  const user: ICognitoUser = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
    fullName: payload.fullName,
  };
  return sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }); // Optionally set an expiration time
};
