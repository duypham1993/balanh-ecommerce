import { Col, Container, Row } from "react-bootstrap";
import bannerBMM from "../../assets/imgs/bmm.webp";
import bannerTet from "../../assets/imgs/banner-tet.webp";
import bannerOrange from "../../assets/imgs/camsanh.webp";
import blog1 from "../../assets/imgs/blog/blog-1.webp";
import blog2 from "../../assets/imgs/blog/blog-2.webp";
import blog3 from "../../assets/imgs/blog/blog-3.webp";
import blog4 from "../../assets/imgs/blog/blog-4.webp";
import blog5 from "../../assets/imgs/blog/blog-5.webp";
import blog6 from "../../assets/imgs/blog/blog-6.webp";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SourceIcon from '@mui/icons-material/Source';
import "./home.scss";

const Home = () => {
  const arrBanner = [
    {
      link: "#",
      imgUrl: bannerBMM,
      alt: "Bột Mộc Mát"
    },
    {
      link: "#",
      imgUrl: bannerTet,
      alt: "Tết Ba Lành"
    },
    {
      link: "#",
      imgUrl: bannerOrange,
      alt: "Cam Sành Hàm Yên"
    }
  ]

  const arrBlog = [
    {
      link: "#",
      imgUrl: blog1,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh"
    },
    {
      link: "#",
      imgUrl: blog2,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh"
    },
    {
      link: "#",
      imgUrl: blog3,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh"
    },
    {
      link: "#",
      imgUrl: blog4,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh"
    },
    {
      link: "#",
      imgUrl: blog5,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh"
    },
    {
      link: "#",
      imgUrl: blog6,
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...",
      author: "Mạc Linh"
    },
  ]
  return (
    <div className="home-page pb-3 pt-md-5 pb-md-4">
      <div className="container-xl px-0">
        {/* Banner */}
        <section>
          {arrBanner.map((item, index) => {
            return (
              <div className="mb-2" key={index}>
                <Link to={item.link}>
                  <img src={item.imgUrl} alt={item.alt} className="mw-100" />
                </Link>
              </div>
            )
          })}
        </section>

        {/* Blog */}
        <section className="pb-2">
          <div className="text-center my-3 my-md-5">
            <h3 className="fs-4">
              <Link to="#" className="link-df link-df--gray">HIỂU VỀ NÔNG NGHIỆP BẢN ĐỊA</Link>
            </h3>
            <h5 className="fs-5">Từ Bón Phân, Gieo Cấy Tới Thu Hoạch, Đóng Gói
            </h5>
          </div>
          <div className="blog">
            <Slider
              infinite={true}
              speed={500}
              slidesToShow={4}
              swipeToSlide={true}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1,
                    className: "center",
                    centerMode: true,
                    centerPadding: "40px"
                  }
                },
              ]}
            >
              {arrBlog.map((item, index) => {
                return (
                  <div key={index} className="px-2">
                    <div>
                      <Link to={item.link}>
                        <img src={item.imgUrl} alt={item.alt} className="w-100" />
                      </Link>
                    </div>
                    <div className="bg-404 p-2 pt-3 p-md-4 position-relative">
                      <div className="text-center mb-2 blog__title">
                        <Link to={item.link} className="link-df link-df--gray fs-5 text-uppercase">
                          {item.title}
                        </Link>
                      </div>
                      <p className="text-center mb-3">{item.desc}</p>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="fs-85">{item.author}</span>
                        <Link to={item.link} className="link-df fs-85 d-inline-flex align-items-center link-df--gray">
                          <KeyboardDoubleArrowRightIcon className="fs-6" />
                          <span>Xem thêm</span>
                        </Link>
                      </div>
                      <div className="blog__icon">
                        <SourceIcon className="fs-2" />
                      </div>

                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;