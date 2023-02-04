import Banner from "../../components/Banner/Banner";
import FilterSort from "../../components/FilterSort/FilterSort";
import Product from "../../components/Product/Product";
import { Container, Col, Row } from "react-bootstrap";
import { FilterBody } from "../../components/FilterSort/Filter/Filter";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilterProduct, getProductsOfCategory } from "../../redux/slice/productSlice";
import Loading from "../../components/Loading/Loading";
import notFound from "../../assets/imgs/search-not-found.png";
import SuccessNoti from "../../components/AddToCart/SuccessNoti";


const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const expandState = useSelector(state => state.filter.ariaExpaned);
  const categories = useSelector(state => state.category.categories);
  const { slug } = useParams();
  const currentCategory = categories?.filter(category => category.slug === slug)[0];
  const { isLoading } = useSelector(state => state.product);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [pages, setPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const sortParam = searchParams.get('sort');
  const currentPage = searchParams.get('page') || 1;
  const [filter, setFilter] = useState(filterParam ? filterParam : "");
  const [sort, setSort] = useState(sortParam ? sortParam : "default");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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

  useEffect(() => {
    currentCategory && dispatch(getFilterProduct(`id=${currentCategory._id}`))
      .unwrap()
      .then(result => {
        setFilters(result);
      })
  }, [currentCategory]);

  useEffect(() => {
    // if current category not found in categories, redirect to page-not-found
    if (categories.length) {
      if (currentCategory) {
        dispatch(getProductsOfCategory({ id: currentCategory._id, url: searchParams.toString() }))
          .unwrap()
          .then((result) => {
            setProducts(result.products);
            setPages(result.pages);
          })
          .catch((error) => {
            if (error.status === 404) {
              navigate("/page-not-found", { replace: true });
            }
          })
      } else {
        navigate("/page-not-found", { replace: true });
      }
    }
  }, [currentCategory, currentPage, filter, sort]);

  return (
    <>
      {products?.length > 0 ?
        <div className="category">
          {currentCategory &&
            <Banner
              name={currentCategory.name}
              desc={currentCategory.desc}
              img={currentCategory.img}
            />
          }
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
                  <div style={{ minHeight: '400px' }}>
                    <Loading />
                  </div>
                  :
                  <>
                    <Row>
                      {products.map((product, index) => {
                        return (
                          <Col xs={6} md={4} xl={3} className={expandState ? "p-0" : "p-0 item__fix-width"} key={index}>
                            <Product product={product} setShow={setShow} />
                          </Col>
                        )
                      })}
                    </Row>
                    <CustomPagination
                      currentPage={parseInt(currentPage)}
                      totalProducts={products.length}
                      pages={pages}
                      handleChangePage={handleChangePage}
                    />
                  </>
                }
              </Col>
            </Row>
          </Container>
          <SuccessNoti
            show={show}
            handleClose={handleClose}
          />

        </div> : !isLoading &&
        <div className="my-2 my-md-3" >
          <Container fluid="lg">
            <div className="bg-white text-center py-3 py-md-4">
              <div className="col-4 col-md-2 d-inline-block">
                <img src={notFound} alt="Not found" className="w-100" />
              </div>
              <h4 className="fw-bold">Không tìm thấy sản phẩm</h4>
            </div>
          </Container>
        </div>
      }
    </>

  )
};

export default Products;