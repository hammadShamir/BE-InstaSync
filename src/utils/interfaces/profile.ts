export interface IProfile {
  id?: string;
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
  access_token?: string;
}
export interface IAddPost {
  image_url: string;
  caption: string;
  access_token?: string;
}

export interface IGetPost {
  access_token?: string;
}
