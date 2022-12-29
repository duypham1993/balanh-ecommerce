import { Container, Row, Col, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import useViewport from "../../../hooks/useViewport";

const FooterMid = () => {
  const { isMd } = useViewport();
  const arrTags = [
    {
      link: "#",
      name: "nông nghiệp"
    },
    {
      link: "#",
      name: "bản địa"
    },
    {
      link: "#",
      name: "truyền thống"
    },
    {
      link: "#",
      name: "Oh-Chewcha"
    },
    {
      link: "#",
      name: "tự nhiên"
    },
    {
      link: "#",
      name: "bền vững"
    },
    {
      link: "#",
      name: "lương nông"
    },
  ]

  const arrList1 = [
    {
      link: "#",
      name: "Giới thiệu"
    },
    {
      link: "#",
      name: "Đăng kí đối tác"
    },
    {
      link: "#",
      name: "Chính sách vận chuyển"
    },
    {
      link: "#",
      name: "Chấp nhận thanh toán"
    },
    {
      link: "#",
      name: "Chính sách bảo mật"
    },
  ]

  const arrList2 = [
    {
      link: "#",
      name: "FAQ"
    },
    {
      link: "#",
      name: "Chính sách bảo hàng"
    },
    {
      link: "#",
      name: "Về Oh-Chewcha"
    },
    {
      link: "#",
      name: "Về Bột Mộc Mát"
    },
    {
      link: "#",
      name: "Quy định đổi trả"
    },
  ]

  return (
    <div className="bg-white pt-4 pb-3 pt-md-5 pb-md-4">
      <Container fluid="lg">
        <Container fluid>
          {isMd ?

            // Destop
            <Row>
              <Col md={3} >
                <div className="footer-mid__box">
                  <h5 className="text-gray text-uppercase fs-6 mb-3 fw-bold hiden-xs">từ khoá nổi bật</h5>
                  <ul className="list-unstyled d-flex flex-wrap m-0">
                    {arrTags.map((item, index) => (
                      <li key={index}>
                        <Link to={item.link} className="d-inline-block fs-85 text-capitalize p-2 m-2 btn-df text-gray text-decoration-none hover-green">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col xs={12} md={2}>
                <div>
                  <h5 className="text-gray text-uppercase fs-6 mb-3 fw-bold">hợp tác</h5>
                  <ul className="list-unstyled mb-3 p-0">
                    {arrList1.map((item, index) => (
                      <li key={index} className="my-2">
                        <Link to={item.link} className="link-df link-df--gray fs-6 py-1 px-0 d-inline-block">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col xs={12} md={3}>
                <div className="custom-accordion">
                  <h5 className="text-gray text-uppercase fs-6 mb-3 fw-bold">hỗ trợ khách hàng</h5>
                  <ul className="list-unstyled mb-3 p-0">
                    {arrList2.map((item, index) => (
                      <li key={index} className="my-2">
                        <Link to={item.link} className="link-df link-df--gray fs-6 py-1 px-0 d-inline-block">{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <h5 className="text-gray text-uppercase fs-6 mb-3 fw-bold">VỀ CÔNG TY TNHH BA LÀNH</h5>
                <ul className="list-unstyled mb-3 p-0">
                  <li className="my-2">
                    <span>GCNDKDN số: 0315366569 do Sở Kế hoạch - Đầu tư Tp. HCM cấp ngày 01/11/2018</span>
                  </li>
                  <li className="my-2">
                    <span>Người đại diện: Nguyễn Văn Doanh</span>
                  </li>
                  <li className="my-2">
                    <span>29/3 Đường số 36, Khu phố 8, P. Hiệp Bình Chánh, Tp. Thủ Đức, Tp. HCM</span>
                  </li>
                  <li className="my-2">
                    <span>Hotline hỗ trợ khách hàng: </span>
                    <a href="tel:18009412" className="p-0 link-df link-df--gray">1800.9412</a>
                  </li>
                  <li className="my-2">
                    <span>Liên hệ hợp tác: </span>
                    <a href="tel:0966939412" className="p-0 link-df link-df--gray">096.693.9412</a>
                  </li>
                  <li className="my-2">
                    <span>Email: </span>
                    <a href="mailto:hello@balanh.com" className="p-0 link-df link-df--gray">hello@balanh.com</a>
                  </li>
                </ul>
              </Col>
            </Row>

            // Mobile
            :
            <Row>
              <Col xs={12}>
                <Accordion className="custom-accordion">
                  <Accordion.Item eventKey="0" className="border-0 pb-2 mb-2">
                    <Accordion.Button as="h5" className="text-gray text-uppercase fs-6 m-0 p-0 fw-bold bg-white shadow-none">
                      hợp tác
                    </Accordion.Button>
                    <Accordion.Body className="p-0">
                      <ul className="list-unstyled mb-3 p-0">
                        {arrList1.map((item, index) => (
                          <li key={index} className="my-2">
                            <Link to={item.link} className="link-df link-df--gray fs-6 py-1 px-0 d-inline-block">{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" className="border-0 pb-2 mb-2">
                    <Accordion.Button as="h5" className="text-gray text-uppercase fs-6 m-0 p-0 fw-bold bg-white shadow-none">
                      hỗ trợ khách hàng
                    </Accordion.Button>
                    <Accordion.Body className="p-0">
                      <ul className="list-unstyled mb-3 p-0">
                        {arrList2.map((item, index) => (
                          <li key={index} className="my-2">
                            <Link to={item.link} className="link-df link-df--gray fs-6 py-1 px-0 d-inline-block">{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="border-0 pb-2 mb-2">
                    <Accordion.Button as="h5" className="text-gray text-uppercase fs-6 m-0 p-0 fw-bold bg-white shadow-none">
                      VỀ CÔNG TY TNHH BA LÀNH
                    </Accordion.Button>
                    <Accordion.Body className="p-0">
                      <ul className="list-unstyled mb-3 p-0">
                        <li className="my-2 py-1">
                          <span>GCNDKDN số: 0315366569 do Sở Kế hoạch - Đầu tư Tp. HCM cấp ngày 01/11/2018</span>
                        </li>
                        <li className="my-2 py-1">
                          <span>Người đại diện: Nguyễn Văn Doanh</span>
                        </li>
                        <li className="my-2 py-1">
                          <span>29/3 Đường số 36, Khu phố 8, P. Hiệp Bình Chánh, Tp. Thủ Đức, Tp. HCM</span>
                        </li>
                        <li className="my-2 py-1">
                          <span>Hotline hỗ trợ khách hàng: </span>
                          <a href="tel:18009412" className="p-0 link-df link-df--gray">1800.9412</a>
                        </li>
                        <li className="my-2 py-1">
                          <span>Liên hệ hợp tác: </span>
                          <a href="tel:0966939412" className="p-0 link-df link-df--gray">096.693.9412</a>
                        </li>
                        <li className="my-2 py-1">
                          <span>Email: </span>
                          <a href="mailto:hello@balanh.com" className="p-0 link-df link-df--gray">hello@balanh.com</a>
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>}
        </Container>
      </Container>
    </div >
  );
};

export default FooterMid;