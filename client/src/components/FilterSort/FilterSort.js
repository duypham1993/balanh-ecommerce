import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FilterHeader } from "./Filter/Filter";
import Sort from "./Sort/Sort";


const FilterSort = ({ sort, handleOnChangeSort }) => {
  return (
    <div className="mb-3">
      <Container fluid="lg">
        <Row className="align-items-center">
          <Col xs={6}>
            <FilterHeader />
          </Col>
          <Col xs={6} className="pull-right">
            <Sort
              sort={sort}
              handleOnChangeSort={handleOnChangeSort}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FilterSort;