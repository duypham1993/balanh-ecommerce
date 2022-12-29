import { Col, Row } from "react-bootstrap";
import { formatCurrency } from "../../services/formatCurrency";

const ProductItemOrder = ({ img, name, price, packing, qty }) => {
  const total = formatCurrency(price * qty);

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
                  <span>{qty}</span>
                </Col>
                <Col xs={12} lg={6} >
                  <p className="pe-4"><strong>{total}</strong></p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductItemOrder;