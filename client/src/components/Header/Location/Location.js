import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';

import "./location.scss";

const Location = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="location-guest">
      <Container fluid>
        <Row className='align-items-center'>
          <Col md={6} className="location">
            <span>
              <LocationOnIcon className="location__icon" />Khu vực của bạn:
            </span>
            <div className="location__choose">
              <Button variant="primary" onClick={handleShow} className="location__button">
                Tp. Hồ Chí Minh
              </Button>
              <Modal show={show} onHide={handleClose} className="location-modal">
                <Modal.Header>
                  <Modal.Title>Chọn Tỉnh/Thành Phố</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md={4}>Hà Nội</Col>
                    <Col md={4}>Đà Nẵng</Col>
                    <Col md={4}>Tp. Hồ Chí Minh</Col>
                  </Row>
                </Modal.Body>
              </Modal>
            </div>
          </Col>
          <Col md={6} className="guest">
            Khách ưu tiên
          </Col>
        </Row>
      </Container>
    </section>

  )
};

export default Location