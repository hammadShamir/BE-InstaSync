export interface ICognitoUser {
  id?: string;
  role: string;
  email: string;
  fullName: string;
  access_token?: string;
}
