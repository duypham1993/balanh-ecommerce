import { useDispatch } from "react-redux";
import { removeProductCart } from "../redux/slice/cartSlice";

export const useRemoveProductCart = (customerID, productID) => {
  const dispatch = useDispatch();
  return (customerID, productID) => {
    dispatch(removeProductCart({ customerID, productID }));
  }
}
