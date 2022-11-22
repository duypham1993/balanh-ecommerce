import axiosPrivate from "../shared/axios/requestMethod";
import { updateLocalAccessToken } from "./localStorage";

export const refreshToken = async () => {
  const res = await axiosPrivate.get('/refreshToken/');
  updateLocalAccessToken(res.data.accessToken);
  return res.data.accessToken;
}
