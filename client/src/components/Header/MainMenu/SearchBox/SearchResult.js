import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/formatCurrency";

const SearchResult = ({ searchResult }) => {
  return (
    <>
      {
        searchResult?.length > 0 &&
        <Dropdown.Menu className="w-100 rounded-0">
          {searchResult.map((product, index) => (
            <Dropdown.Item as="div" key={index} className="p-0">
              <Link to={`/product/${product._id}`} className="d-flex link-df link-df--gray border-bottom-dashed pb-2 mb-2 ps-1">
                <div className="me-2">
                  <img src={product.imgs[0]} alt={product.name} className="img-square" />
                </div>
                <div className="d-flex flex-column justify-content-between py-1">
                  <p>{product.name}</p>
                  <p>
                    <span className="fw-bold text-black">{formatCurrency(product.price)} / </span>
                    <span className="fw-bold text-red">{product.packing}</span>
                  </p>
                </div>
              </Link>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>

      }
    </>
  );
};

export default SearchResult;