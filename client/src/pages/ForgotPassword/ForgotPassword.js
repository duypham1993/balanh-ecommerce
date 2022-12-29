import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

const ForgotPassword = () => {
  return (
    <div className="forgotpw-page">
      <Container>
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={5}>
              <Form className="custom-form">
                <p className="text-center"><em><strong>Vui lòng nhập địa chỉ email bạn đã dùng để đăng ký. Bạn sẽ nhận được một liên kết tạm thời để cài đặt lại mật khẩu của bạn.</strong></em></p>
                <FloatingLabel label="Email" className="mb-4 custom-form__label">
                  <Form.Control type="email" placeholder="Email" className="custom-form__input" required />
                </FloatingLabel>
                <Button className="custom-form__submit" type="submit">Gửi liên kết cài đặt lại</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ForgotPassword;