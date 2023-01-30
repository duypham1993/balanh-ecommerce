import { Container, Dropdown, Row, Col } from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../../redux/slice/cartSlice";
import { getLocalCurrentUser } from "../../../../utils/localStorage";
import { formatCurrency } from "../../../../utils/formatCurrency";
import { useRemoveProductCart } from "../../../../hooks/useRemoveProductCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const removeProductCart = useRemoveProductCart();
  const localUser = getLocalCurrentUser();
  const currentUser = useSelector(state => state.auth.currentUser);
  const cart = useSelector(state => state.cart.cart);
  const cartCount = cart.products?.reduce((total, currentProduct) => total + currentProduct.qty, 0) || 0;
  const cartTotal = cart.products?.reduce((total, currentProduct) => (total + (currentProduct.qty * currentProduct.price)), 0) || 0;
  const customerID = cart.customerID;

  useEffect(() => {
    localUser && dispatch(getCart(localUser._id));
  }, []);

  return (
    <div className="cart">
      <Dropdown>
        <Dropdown.Toggle className='text-gray position-relative d-inline-block bg-white border-0'>
          < ShoppingCartCheckoutIcon className='fs-3' />
          <span className="cart__count">{cartCount}</span>
          <span className="d-none d-md-inline fw-bold ps-3">
            {formatCurrency(cartTotal)}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end cart-dropdown">
          {cart.products?.length ?
            <div>
              <div className="d-flex justify-content-between fs-6 mb-2">
                <div className="mb-2">
                  <p>SẢN PHẨM</p>
                  <p>{cartCount}</p>
                </div>
                <div className="mb-2 text-end">
                  <p>THÀNH TIỀN</p>
                  <p className="fw-bold">{formatCurrency(cartTotal)}</p>
                </div>
              </div>

              <Container fluid className="fs-85 py-2 px-0 border-bottom border-1 border-green">
                {cart.products?.map((product, index) => {
                  const productID = product._id;
                  return (
                    <Row key={index} className="position-relative mb-3">
                      <Col xs={3}>
                        <img src={product.imgs[0]} alt={product.name} className="w-100" />
                      </Col>
                      <Col xs={5} className="p-0">
                        <Dropdown.Item as="p" className="p-0 mb-1 bg-white">
                          <Link to={`/product/${product._id}`} className="link-df link-df--gray p-0 fw-bold">{product.name}</Link>
                        </Dropdown.Item>
                        <p >

                        </p>
                        <p className="mb-1">
                          <span className="me-2">{formatCurrency(product.price)}</span>
                          <span>[{product.packing}]</span>
                        </p>
                        <p>
                          <span>SL: {product.qty}</span>
                        </p>
                      </Col>
                      <Col xs={4} className="fw-bold text-end">
                        <p>{formatCurrency(product.qty * product.price)}</p>
                      </Col>
                      <span className="position-absolute bottom-0 end-0 w-auto">
                        <span className="d-flex justify-content-center align-items-center cart-dropdown__remove" onClick={(e) => removeProductCart(customerID, productID)}>
                          <CloseIcon className="fs-6 fw-bold" />
                        </span>
                      </span>
                    </Row>
                  )
                })
                }

              </Container>
              <Dropdown.Item as="div" className="text-center mt-3 mt-md-4 bg-white">
                <Link to="/cart" className="link-df link-df--gray fw-bold ">Chi Tiết Giỏ Hàng</Link>
              </Dropdown.Item>
            </div>
            :
            <div className="cart__empty">
              Chưa có sản phẩm nào được thêm vào giỏ hàng!
            </div>
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
};

export default Cart;