import { Col, Container, Modal, Row } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ListAltIcon from '@mui/icons-material/ListAlt';

const LayoutProfile = () => {
  return (
    <div className="profile-page my-4 my-md-5">
      <Container fluid="lg">
        <Row>
          <Col xs="12" md="3" lg="2">
            <nav className="d-flex flex-wrap flex-md-column justify-content-center justify-content-md-start">
              <NavLink to='/profile' className="text-decoration-none d-flex justify-content-center align-items-center col-6 col-sm-4 col-md-12 text-reset py-3 p-md-4 profile-page__menu-item">
                <AccountCircleIcon />
                <span className="ps-1">Tài khoản</span>
              </NavLink>
              <NavLink to='/addresses' className="text-decoration-none d-flex justify-content-center align-items-center col-6 col-sm-4 col-md-12 text-reset py-3 p-md-4 profile-page__menu-item">
                <LocationOnIcon />
                <span className="ps-1">Quản lí địa chỉ</span>
              </NavLink>
              <NavLink to='/orders' className="text-decoration-none d-flex justify-content-center align-items-center col-6 col-sm-4 col-md-12 text-reset py-3 p-md-4 profile-page__menu-item">
                <ListAltIcon />
                <span className="ps-1">Lịch sử đơn hàng</span>
              </NavLink>
            </nav>
          </Col>
          <Col xs="12" md="9" lg="10" className="position-relative">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LayoutProfile;