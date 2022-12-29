import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import "./product-item-cart.scss";
import CloseIcon from '@mui/icons-material/Close';
import Quantity from "../Quantity/Quantity";
import { useRemoveProductCart } from "../../hooks/useRemoveProductCart";
import { updateCart } from "../../redux/slice/cartSlice";
import useDebounce from "../../hooks/useDebounce";

const ProductItemCart = ({ customerID, id, img, name, price, packing, qty, maxQty }) => {
  const dispatch = useDispatch();
  const removeProductCart = useRemoveProductCart();
  const [value, setValue] = useState(qty);
  const total = formatCurrency(price * qty);

  useDebounce(() => {
    const update = {
      customerID: customerID,
      product: {
        _id: id,
        qty: value <= 0 ? 1 : value
      }
    };

    dispatch(updateCart(update));
  }, [value], 500);

  return (
    <div className="product-item">
      <Row>
        <Col xs={4} lg={3}>
          <div className="product-item__wrapper-img">
            <img src={img} alt={name} className="product-item__img" />
          </div>
        </Col>
        <Col xs={8} lg={9}>
          <Row>
            <Col xs={12} lg={4}>
              <p className="pb-1">
                {name}
              </p>
              <p className="d-flex pb-2">
                <span className="pe-4">
                  {formatCurrency(price)}
                </span>
                <span className="">
                  {packing}
                </span>
              </p>
            </Col>
            <Col xs={12} lg={8}>
              <Row className="align-items-center position-relative">
                <Col xs={12} lg={6} className="pb-2">
                  <Quantity
                    value={value}
                    setValue={setValue}
                    maxQty={maxQty}
                  />
                </Col>
                <Col xs={12} lg={6} >
                  <p className="pe-4"><strong>{total}</strong></p>
                </Col>
                <button className="product-item__remove" onClick={() => removeProductCart(customerID, id)}>
                  <CloseIcon className="product-item__remove-icon" />
                </button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductItemCart;