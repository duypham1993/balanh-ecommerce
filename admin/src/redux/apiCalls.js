import { publicRequest, userRequest } from "../requestMethod";
import { loginFailuer, loginStart, loginSucces } from "./slice/loginSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/authAdmin/login", user);
    dispatch(loginSucces(res.data));
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  } catch (err) {
    dispatch(loginFailuer());
  }
};