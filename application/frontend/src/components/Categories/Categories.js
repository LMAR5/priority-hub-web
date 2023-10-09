import React, {useState} from 'react';
import CategoriesTable from './CategoriesTable';
import CategoryService from '../../services/CategoryService'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Categories = () => {

  const [loadingCategoryTable, setLoadingCategoryTable] = useState(false);
  const [loadingSearchBar, setLoadingSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  const renderCategoryTable = () => {
    
      return(
        <CategoriesTable /> 
      )
  }

  const updateSearchTermBar = (event) => {
    //console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const performSearch = () => {
    CategoryService.searchCategory().then((data) => {
        console.log("Search Category response:",data);
        //Update variable that stores the list of categories from backend.
    });
  }

  const renderSearchBar = () => {
    return(
        <InputGroup className="mb-1 mt-3">
            <Form.Control
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => {updateSearchTermBar(event)}} />
            <Button variant="primary" onClick={() => {performSearch()}}>Search</Button>
        </InputGroup>
    );
  }

  let contentTable = loadingCategoryTable ? <h2>Loading...</h2> : renderCategoryTable();
  let showSearchBard = loadingSearchBar ? <h2>Loading...</h2> : renderSearchBar();

  return(
    <div>
        <Row>
            <Col md={{ span: 4, offset: 8 }}>{showSearchBard}</Col>
        </Row>
        <Row className="mt-3">
        <Col>
            <h1>Categories</h1>
            {contentTable}
        </Col>
    </Row>
    </div>                
    );

};

export default Categories;