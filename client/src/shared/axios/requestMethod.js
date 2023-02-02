import axios from "axios";
import { clearLocalStorage, getLocalAccessToken } from "../../utils/localStorage";
import { refreshToken } from "../../utils/refreshToken";

// const BASE_URL = "https://api-balanh.onrender.com/api";
const BASE_URL = process.env.REACT_APP_URL_API;
let refreshTokenPromise = null;

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
);

axiosPrivate.interceptors.response.use(
  response => response,
  (error) => {
    const prevRequestConfig = error?.config;
    if (error?.response?.status === 403 && error?.response?.data === "logout") {
      clearLocalStorage();
      return window.location.reload();
    }

    if (error?.response?.status === 401 && !prevRequestConfig.sent) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken().then(token => {
          refreshTokenPromise = null;
          return token;
        })
      }

      return refreshTokenPromise.then(token => {
        return axiosPrivate({
          ...prevRequestConfig,
          headers: {
            ...prevRequestConfig.headers,
            accesstoken: `Bearer ${token}`,
            sent: true
          }
        });
      })
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;
