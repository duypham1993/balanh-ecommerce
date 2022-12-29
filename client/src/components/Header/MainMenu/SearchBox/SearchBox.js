import SearchIcon from '@mui/icons-material/Search';
import "./search-box.scss";
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../../../hooks/useDebounce';
import { getProductsForSearchBox } from '../../../../redux/slice/productSlice';
import SearchResult from './SearchResult';
import { Dropdown } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParams = searchParams.get("query");
  const [query, setQuery] = useState(queryParams?.trim() ? queryParams : '');
  const refQuery = useRef('');
  const [searchResult, setSearchResult] = useState([]);
  const [show, setShow] = useState(false);
  const { isSearching } = useSelector(state => state.product);

  useDebounce(() => {
    refQuery.current?.trim() ?
      dispatch(getProductsForSearchBox(`query=${query}`))
        .unwrap()
        .then((result) => {
          setSearchResult(result.products);
        }) :
      setSearchResult([]);
  }, [query], 500);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    refQuery.current = value;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    query.trim() && navigate(`/search?query=${query}`);
  }

  return (
    <Dropdown
      className="custom-dropdown search-box"
      show={show}
      onToggle={(isOpen, event, metadata) => {
        // show dropdown when click toogle button
        if (event.source === "click") {
          setShow(true)
        }

        // hide dropdown when click outside or choose result 
        if (event.source === "rootClose" && event.originalEvent.target.className !== "search-box__input" || event.source === "select") {
          setShow(false);
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <Dropdown.Toggle as={"div"}>
          <input
            type="text"
            placeholder="TÌM THEO SẢN PHẨM..."
            className='search-box__input'
            value={query}
            onChange={(e) => handleOnChange(e)}
          />
        </Dropdown.Toggle>
        {isSearching ?
          <button disabled type="submit" className="search-box__submit cursor-wait">
            <PuffLoader
              color="#497D3B"
              size={25}
            />
          </button> :
          <button type="submit" className="search-box__submit">
            <SearchIcon />
          </button>
        }
      </form>
      <SearchResult searchResult={searchResult} />
    </Dropdown>
  );
};

export default Search;