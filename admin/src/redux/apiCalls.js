import { publicRequest, userRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSucces } from "./slice/loginSlice";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess
} from "./slice/productSlice";

import { addCategoryFailure, addCategoryStart, addCategorySucces, getCategoryFailure, getCategoryStart, updateCategoryFailure, updateCategoryStart, updateCategorySucces } from "./slice/categorySlice";

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

export const addCategory = async (dispatch, category) => {
  dispatch(addCategoryStart());
  try {
    const res = await userRequest.post("/category/create", category);
    dispatch(addCategorySucces(res.data));
  } catch {
    dispatch(addCategoryFailure());
  }
}

export const getCategories = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await userRequest.get("/category/");
    dispatch(getCategoryStart(res.data));
  } catch {
    dispatch(getCategoryFailure());
  }
}

export const updateCategory = async (dispatch, id) => {
  dispatch(updateCategoryStart());
  try {
    const res = await userRequest.put(`/category/${id}`, id);
    dispatch(updateCategorySucces(res.data));
  } catch {
    dispatch(updateCategoryFailure());
  }
}

export const deleteCategory = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/category/${id}`, id);
    dispatch(deleteProductSuccess(id));
  } catch {
    dispatch(deleteProductFailure());
  }
}