import "./banner.scss";
import banner from "../../assets/imgs/banner-dotuoi.jpeg";
import Container from "react-bootstrap/Container";
const Banner = ({ name, desc, img }) => {
  return (
    <div className="banner">
      <Container fluid="lg">
        <div className="banner__wrapper">
          <div className="banner__text">
            <h1 className="banner__title">
              {name}
            </h1>
            <h3 className="banner__desc">
              {desc}
            </h3>
          </div>
          <img src={img} alt="banner imgage" className="banner__img" />
        </div>
      </Container>
    </div>
  );
};

export default Banner;