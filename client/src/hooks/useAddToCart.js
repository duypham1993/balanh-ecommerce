import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slice/cartSlice";
import { getLocalCurrentUser } from "../utils/localStorage";

export const useAddToCart = (id, qty, setShow) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (id, qty, setShow) => {
    const localUser = getLocalCurrentUser();

    if (localUser?._id) {
      const userCart = {
        customerID: localUser._id,
        product: {
          _id: id,
          qty: qty
        }
      };
      qty > 0 && dispatch(addToCart(userCart))
        .unwrap()
        .then(() => {
          setShow(true);
        })
    } else {
      navigate("/login");
    }
  }
}
