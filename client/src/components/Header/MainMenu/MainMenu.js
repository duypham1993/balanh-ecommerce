import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import "./mainmenu.scss";
import logo from "../../../assets/imgs/logo.webp";
import Cart from './Cart/Cart';
import MenuMobile from './MenuMobile/MenuMobile';
import { Link } from "react-router-dom";
import SearchBox from './SearchBox/SearchBox';
import useViewport from '../../../hooks/useViewport';

const MainMenu = () => {
  const { isMd } = useViewport();
  return (
    <div className='pt-2 pb-0 pb-md-2 bg-white main-menu'>
      <Container fluid="lg">
        <Navbar key={"md"} expand={"md"} className="bg-none">
          <div className='col-md-4'>
            <Link to="/" className='main-menu__logo'>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <Col className="search" md={5} xs={12}>
            <SearchBox />
          </Col>

          <Col md={3} className="d-flex justify-content-end">
            <Cart />
            {!isMd && <MenuMobile expand={"md"} />}
          </Col>
        </Navbar>
      </Container>
    </div >
  );
}

export default MainMenu;