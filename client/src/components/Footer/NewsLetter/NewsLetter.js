import "./news-letter.scss";
import Container from "react-bootstrap/Container";
import EmailIcon from '@mui/icons-material/Email';
const NewsLetter = () => {
  return (
    <div className="newsletter">
      <Container fluid="lg">
        <h3 className="text-uppercase fs-5 mb-2">newsletter</h3>
        <p className="mb-3">Hãy đăng ký email bạn vào ô phía dưới để luôn nhận được các thông tin mới nhất từ nhà Ba Lành!</p>
        <form className="d-flex newsletter__form">
          <div className="newsletter__input">
            <EmailIcon className="newsletter__icon-input" />
            <input type="text" placeholder="Your Email Address" />
          </div>
          <button className="btn-df btn-df--green text-uppercase newsletter__submit">
            subscribe
          </button>

        </form>

      </Container>
    </div >
  );
};

export default NewsLetter;
