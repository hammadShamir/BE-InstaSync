import axios from "axios";

export const handleGetRequest = async (
  url: string,
  params: object = {},
  headers: object = {}
): Promise<any> => {
  const response = await axios.get(url, { params, headers });
  return response.data;
};

export const handlePostRequest = async (
  url: string,
  data: object = {},
  headers: object = {}
): Promise<any> => {
  const response = await axios.post(url, data, { headers });
  return response.data;
};

export const handlePutRequest = async (
  url: string,
  data: object = {},
  headers: object = {}
): Promise<any> => {
  const response = await axios.put(url, data, { headers });
  return response.data;
};

export const handleDeleteRequest = async (
  url: string,
  params: object = {},
  headers: object = {}
): Promise<any> => {
  const response = await axios.delete(url, { params, headers });
  return response.data;
};
