import axios from "axios";

const getcurrentUser = JSON.parse(localStorage.getItem("currentUser"));
const TOKEN = getcurrentUser.token;
const BASE_URL = process.env.REACT_APP_URL_API;

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Beaser ${TOKEN}` }
});