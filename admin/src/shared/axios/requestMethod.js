import axios from "axios";
import { refreshToken } from "../../utils/refreshToken";
import { clearLocalStorage, getLocalAccessToken } from "../../utils/localStorage";

const BASE_URL = "https://api-balanh-ecommerce.vercel.app/api";

export const publictRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

axiosPrivate.interceptors.request.use(
  config => {
    if (!config.headers['accesstoken']) {
      config.headers['accesstoken'] = `Bearer ${getLocalAccessToken()}`;
    }

    return config;
  }, (error) => Promise.reject(error)
)

axiosPrivate.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequestConfig = error?.config;
    if (error?.response?.status === 403 && error?.response?.data === "logout") {
      clearLocalStorage();
      return window.location.reload();
    }

    if (error?.response?.status === 401 && !prevRequestConfig.sent) {
      const newAccessToken = await refreshToken();

      return axiosPrivate({
        ...prevRequestConfig,
        headers: {
          ...prevRequestConfig.headers,
          accesstoken: `Bearer ${newAccessToken}`,
          sent: true
        }
      });
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
