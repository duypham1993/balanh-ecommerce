import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductItemCart from "../../components/ProductItemCart/ProductItemCart";
import { getLocalCurrentUser } from "../../utils/localStorage";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const CartPage = () => {
  const { cart, isLoading } = useSelector(state => state.cart);
  const cartCount = cart.products?.reduce((total, currentProduct) => total + currentProduct.qty, 0) || 0;
  const cartTotal = cart.products?.reduce((total, currentProduct) => (total + (currentProduct.qty * currentProduct.price)), 0) || 0;
  const customerID = getLocalCurrentUser()?._id;
  const shipping = cartTotal ? 45000 : 0;

  return (
    <>
      {isLoading ?
        <Loading /> :
        <div className="pt-4 pb-4 cart-page">
          <Container>
            <Row>
              <Col xs={12} md={8}>
                <ListGroup>
                  <ListGroup.Item className="fs-4 pt-3 pb-3">
                    GIỎ HÀNG
                  </ListGroup.Item>
                  {cart.products?.length ?
                    cart.products.map((product, index) => {
                      return (
                        <ListGroup.Item key={index} className="pt-4 pb-4">
                          <ProductItemCart
                            customerID={customerID}
                            id={product._id}
                            img={product.imgs[0]}
                            name={product.name}
                            price={product.price}
                            packing={product.packing}
                            qty={product.qty}
                            maxQty={product.maxQty}
                          />
                        </ListGroup.Item>
                      )
                    }) :
                    <ListGroup.Item className="pt-4 pb-4">
                      <span>Chưa có sản phẩm nào được thêm vào giỏ hàng!
                      </span>
                    </ListGroup.Item>
                  }
                </ListGroup>
              </Col>
              <Col xs={12} md={4}>
                <ListGroup>
                  <ListGroup.Item className="pt-3 pb-3">
                    <div className="d-flex justify-content-between">
                      <span>{cartCount} sản phẩm</span>
                      <span className="text-red">{formatCurrency(cartTotal)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Vận chuyển</span>
                      <span className="text-red">{formatCurrency(shipping)}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="pt-3 pb-3">
                    <div className="d-flex justify-content-between">
                      <span>Tổng cộng:</span>
                      <span className="text-red">{formatCurrency(cartTotal + shipping)}</span>
                    </div>
                  </ListGroup.Item>
                  {cart.products?.length ?
                    <ListGroup.Item className="pt-3 pb-3 text-center">
                      <Link to="/checkout" className="btn-df btn-df--green text-reset text-decoration-none d-inline-block">THANH TOÁN</Link>
                    </ListGroup.Item>
                    : <></>
                  }
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </div>
      }
    </>
  );
};

export default CartPage;