import FilterSort from "../../components/FilterSort/FilterSort";
import Product from "../../components/Product/Product";
import { Container, Col, Row } from "react-bootstrap";
import { FilterBody } from "../../components/FilterSort/Filter/Filter";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { getFilterProduct, getProductsForSearchPage } from "../../redux/slice/productSlice";
import { useSearchParams } from "react-router-dom";
import notFound from "../../assets/imgs/search-not-found.png";

const SearchPage = () => {
  const dispatch = useDispatch();
  const expandState = useSelector(state => state.filter.ariaExpaned);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query');
  const filterParam = searchParams.get('filter');
  const sortParam = searchParams.get('sort');
  const currentPage = searchParams.get('page');
  const { isLoading } = useSelector(state => state.product);
  const [searchResult, setSearchResult] = useState([]);
  const [pages, setPages] = useState(1);
  const [filter, setFilter] = useState(filterParam ? filterParam : "");
  const [sort, setSort] = useState(sortParam ? sortParam : "default");
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    dispatch(getFilterProduct(`query=${queryParam}`))
      .unwrap()
      .then((result) => {
        setFilters(result);
      })
  }, [queryParam]);

  useEffect(() => {
    if (!currentPage) {
      searchParams.set('page', 1);
      setSearchParams(searchParams);
    };

    dispatch(getProductsForSearchPage(searchParams.toString()))
      .unwrap()
      .then((result) => {
        setSearchResult(result.products);
        setPages(result.pages);
      })
  }, [queryParam, currentPage, filter, sort]);

  const handleChangePage = (index) => {
    searchParams.set("page", index);
    setSearchParams(searchParams);
  };

  const handleOnChangeSort = (e) => {
    setSort(e.target.value);
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
    handleChangePage(1);
  };

  const handleOnChangeFilter = (e) => {
    setFilter(e.target.value);
    searchParams.set('filter', e.target.value);
    setSearchParams(searchParams);
    handleChangePage(1);
  };

  const clearFilter = () => {
    setFilter("");
    searchParams.delete('filter');
    setSearchParams(searchParams);
    handleChangePage(1);
  };

  return (
    <>
      <div className="my-3 my-md-5" >
        <Container fluid="lg">
          <h5 className="text-uppercase">kết quả tìm kiếm</h5>
        </Container>

        {searchResult?.length > 0 ?
          <div className="my-2 my-md-3">
            <FilterSort
              sort={sort}
              handleOnChangeSort={handleOnChangeSort}
            />
            <Container fluid="lg">
              <Row className="justify-content-end align-items-start position-relative">
                <FilterBody
                  filters={filters}
                  filter={filter}
                  handleOnChangeFilter={handleOnChangeFilter}
                  clearFilter={clearFilter}
                />
                <Col xs={12} md={9} className={expandState ? "custom-collapse" : "custom-collapse fix-width"}>
                  {isLoading ?
                    <div style={{ minHeight: "400px" }}>
                      <Loading />
                    </div> :
                    <>
                      <Row>
                        {searchResult.map((product, index) => (
                          <Col xs={6} md={4} xl={3} className={expandState ? "p-0" : "p-0 item__fix-width"} key={index}>
                            <Product product={product} />
                          </Col>
                        ))}
                      </Row>
                      <CustomPagination
                        currentPage={parseInt(currentPage)}
                        totalProducts={searchResult.length}
                        pages={pages}
                        handleChangePage={handleChangePage}
                      />
                    </>
                  }
                </Col>
              </Row>
            </Container>
          </div>
          :
          <div className="my-2 my-md-3" >
            <Container fluid="lg">
              <div className="bg-white text-center py-3 py-md-4">
                <div className="col-4 col-md-2 d-inline-block">
                  <img src={notFound} alt="Not found" className="w-100" />
                </div>
                <h4 className="fw-bold">Không tìm thấy sản phẩm</h4>
                <h5>Vui lòng tìm kiếm bằng từ khoá khác</h5>
                <p className="fst-italic">Lưu ý tìm kiếm tên sản phẩm bằng tiếng Việt có dấu</p>
              </div>
            </Container>
          </div>
        }
      </div>
    </>

  )
};

export default SearchPage;