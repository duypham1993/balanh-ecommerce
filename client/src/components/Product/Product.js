import "./product.scss";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../hooks/useAddToCart";
import Quantity from "../Quantity/Quantity";
import { formatCurrency } from "../../utils/formatCurrency";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useSelector } from "react-redux";

const Product = ({ product, setShow }) => {
  const [value, setValue] = useState(1);
  const addToCart = useAddToCart();
  const { cart } = useSelector(state => state.cart);
  const checkProduct = cart?.products?.filter(item => item._id === product._id)[0];
  const checkQty = checkProduct ? product.qty - checkProduct.qty : product.qty;
  const maxQty = checkQty < 0 ? 0 : checkQty;

  return (
    <div className="mb-4">
      <div className="m-2 shadow-sm">
        <Link to={`/product/${product._id}`}>
          <img src={product.imgs[0]} alt="cai kale" className="w-100" />
        </Link>
        <div className="bg-white p-2">
          <h5 className="mb-1 px-1">
            <Link to={`/product/${product._id}`} className="link-df link-df--gray fs-6">{product.name}</Link>
          </h5>
          <p className="mb-1 px-1 fst-italic overflow-hidden text-nowrap text-ellipsis text-gray-2">{product.desc}</p>
          <p className="text-green fs-85 mb-1 px-1">
            Xuất xứ: <span>{product.origin.name}</span>
          </p>
          <div className="d-flex justify-content-between px-1">
            <span className="text-red fs-85">[{product.packing}]</span>
            <span className="fw-bold fs-85 text-black">{formatCurrency(product.price)}</span>
          </div>
        </div>
        <div className="bg-gray">
          {product.qty > 0 ?
            <div className="product__wrapper-form">
              <div className="d-flex align-items-center product__form">
                <Quantity
                  value={value}
                  setValue={setValue}
                  maxQty={maxQty}
                />
                <button className="text-gray-2 border-0 hover-green" onClick={() => addToCart(product._id, value, setShow)}>
                  <ShoppingBasketIcon className="fs-3 mx-1" />
                  <span className="d-none d-xl-inline ps-1 fs-85 text-capitalize">Cho vào giỏ hàng</span>
                </button>
              </div>
            </div> :
            <div className="d-flex align-items-center justify-content-center text-gray-2 product__sold-out">
              <RemoveShoppingCartIcon className="fs-3" />
              <span className="ps-1 fs-85 text-capitalize">Tạm thời hết hàng</span>
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Product