import "./filter.scss";
import CheckIcon from '@mui/icons-material/Check';
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { collapse } from "../../../redux/slice/filterSlice";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseIcon from '@mui/icons-material/Close';

export const FilterHeader = () => {
  const dispatch = useDispatch();
  let expandState = useSelector(state => state.filter.ariaExpaned);

  return (
    <div className="filter">
      <button className="d-flex align-items-center filter__btn" onClick={() => dispatch(collapse())}>
        <span className="d-flex align-items-center justify-content-center filter__icon">
          {expandState ? <CheckIcon /> : <VisibilityOffIcon />}
        </span>
        <span className="text-uppercase px-3">bộ lọc sản phẩm</span>
      </button>
    </div>
  );
};

export const FilterBody = ({ filters, filter, handleOnChangeFilter, clearFilter }) => {
  let expandState = useSelector(state => state.filter.ariaExpaned);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(collapse());
  }
  return (
    <>
      <Col className={expandState ? "d-none d-md-block  custom-collapse filter show" : "d-none d-md-block custom-collapse filter not-show"} md={3}>
        <Offcanvas show={expandState} onHide={handleClose} responsive="md" className="filter">
          <div className="bg-white p-3 p-lg-4 mb-4">
            <Offcanvas.Header className="d-md-block p-0 align-items-start">
              <Offcanvas.Title className="filter__title">chọn tiêu chí hiển thị</Offcanvas.Title>
              <button className='d-md-none border-0 bg-white p-1' onClick={handleClose}>
                <CloseIcon />
              </button>
            </Offcanvas.Header>

            <button className="btn-df btn-df--green text-uppercase fs-85 my-2 px-2 py-1" onClick={() => clearFilter()}>
              bỏ hết tiêu chí đã chọn
            </button>
            <div className="pt-2">
              <h6 className="fw-bold text-uppercase mb-3">xuất xứ</h6>
              <ul className="list-unstyled">
                {filters?.map((item, index) => {
                  return (
                    <li className="mt-2 fw-light text-gray d-flex align-items-center" key={index}>
                      <input
                        type="radio"
                        id={index}
                        name="origin"
                        value={item.name}
                        className="cursor-pointer"
                        checked={item.name === filter}
                        onChange={(e) => handleOnChangeFilter(e)}
                      />
                      <label htmlFor={index} className="ms-1 position-relative cursor-pointer">
                        {item.name}
                        <span className="filter__item-numbers">{item.count}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Offcanvas>
      </Col>
    </>
  );
};
