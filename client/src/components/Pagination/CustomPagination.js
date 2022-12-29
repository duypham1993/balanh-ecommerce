import "./custom-pagination.scss";
import { Container, Col, Row } from "react-bootstrap";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

const CustomPagination = ({ currentPage, totalProducts, handleChangePage, pages }) => {
  const length = pages > 5 ? 5 : pages;
  return (
    <Container fluid="lg">
      <Row className="mb-3 p-2 bg-white text-gray shadow-sm align-items-center custom-pagination">
        <Col xs={12} sm={6}>
          <p className="fs-85 mb-2 m-sm-0 text-center text-sm-start">
            {totalProducts > 40 ?
              `Hiển thị 40/${totalProducts} sản phẩm` :
              `Hiển thị ${totalProducts} sản phẩm`
            }
          </p>
        </Col>
        <Col xs={12} sm={6}>
          <div className="d-flex justify-content-center d-sm-block">
            <ul className="pagination justify-content-end custom-pagination__numbers">
              {currentPage > 4 && pages > 5 &&
                <li className="page-item" aria-current="page" onClick={() => handleChangePage(1)} >
                  <span className="page-link custom-pagination__link">
                    <KeyboardDoubleArrowLeftOutlinedIcon />
                  </span>
                </li>
              }
              {currentPage > 1 &&
                <li className="page-item" aria-current="page" onClick={() => handleChangePage(currentPage - 1)} >
                  <span className="page-link custom-pagination__link">
                    <KeyboardArrowLeftOutlinedIcon />
                  </span>
                </li>
              }
              {currentPage < 5 ?
                <>
                  {[...new Array(length)].map((item, index) => (
                    <li className={currentPage == (index + 1) ? "page-item active" : "page-item"} aria-current="page" key={index} onClick={() => handleChangePage(index + 1)}>
                      <span className="page-link custom-pagination__link">{index + 1}</span>
                    </li>
                  ))}
                  {currentPage < pages &&
                    <li className="page-item" aria-current="page" onClick={() => handleChangePage(currentPage + 1)} >
                      <span className="page-link custom-pagination__link">
                        <KeyboardArrowRightOutlinedIcon />
                      </span>
                    </li>
                  }
                  {pages > 5 &&
                    <li className="page-item" aria-current="page" onClick={() => handleChangePage(pages)} >
                      <span className="page-link custom-pagination__link">
                        <KeyboardDoubleArrowRightOutlinedIcon />
                      </span>
                    </li>
                  }
                </>
                : currentPage > pages - 4 ?
                  <>
                    {[...new Array(length)].map((item, index) => (
                      <li className={currentPage == (pages - 4 + index) ? "page-item active" : "page-item"} aria-current="page" key={index} onClick={() => handleChangePage(pages - 4 + index)}>
                        <span className="page-link custom-pagination__link">{pages - 4 + index}</span>
                      </li>
                    ))}
                    {currentPage < pages &&
                      <li className="page-item" aria-current="page" onClick={() => handleChangePage(currentPage + 1)} >
                        <span className="page-link custom-pagination__link">
                          <KeyboardArrowRightOutlinedIcon />
                        </span>
                      </li>
                    }
                  </>
                  :
                  <>
                    {[...new Array(length)].map((item, index) => (
                      <li className={currentPage == (currentPage - 2 + index) ? "page-item active" : "page-item"} aria-current="page" key={index} onClick={() => handleChangePage(currentPage - 2 + index)}>
                        <span className="page-link custom-pagination__link">{currentPage - 2 + index}</span>
                      </li>
                    ))}
                    {currentPage < pages &&
                      <li className="page-item" aria-current="page" onClick={() => handleChangePage(currentPage + 1)} >
                        <span className="page-link custom-pagination__link">
                          <KeyboardArrowRightOutlinedIcon />
                        </span>
                      </li>
                    }
                    {pages > 5 &&
                      <li className="page-item" aria-current="page" onClick={() => handleChangePage(pages)} >
                        <span className="page-link custom-pagination__link">
                          <KeyboardDoubleArrowRightOutlinedIcon />
                        </span>
                      </li>
                    }
                  </>
              }
            </ul>
          </div>

        </Col>
      </Row>
    </Container >
  );
};

export default CustomPagination;