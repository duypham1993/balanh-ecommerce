import { publicRequest, userRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSucces } from "./slice/loginSlice";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./slice/productSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/authAdmin/login", user);
    dispatch(loginSucces(res.data));
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/product/create", product);
    dispatch(addProductSuccess(res.data));
  } catch {
    dispatch(addProductFailure());
  }
};

export const getProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/product/");
    dispatch(getProductSuccess(res.data));
  } catch {
    dispatch(getProductFailure());
  }
};

export const updateProduct = async (dispatch, id) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/product/${id}`, id);
    dispatch(updateProductSuccess(res.data));
  } catch {
    dispatch(updateProductFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/product/delete/${id}`, id);
    dispatch(deleteProductSuccess(id));
  } catch {
    dispatch(deleteProductFailure());
  }
}