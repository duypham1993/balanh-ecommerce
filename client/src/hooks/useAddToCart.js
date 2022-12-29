import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slice/cartSlice";
import { getLocalCurrentUser } from "../utils/localStorage";

export const useAddToCart = (id, qty) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (id, qty) => {
    const localUser = getLocalCurrentUser();

    if (localUser?._id) {
      const userCart = {
        customerID: localUser._id,
        product: {
          _id: id,
          qty: qty
        }
      };
      qty > 0 && dispatch(addToCart(userCart));
    } else {
      navigate("/login");
    }
  }
}
