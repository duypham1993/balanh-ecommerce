import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import TopContact from "./TopContact/TopContact";
import Login from "./Login/Login";

const Topbar = () => {
  return (
    <div className="bg-green">
      <Container fluid="lg">
        <Row className="align-items-center">
          <Col md={8}>
            <TopContact />
          </Col>
          <Col xs={12} md={4}>
            <Login />
          </Col>
        </Row>
      </Container>
    </div >
  )
};

export default Topbar;