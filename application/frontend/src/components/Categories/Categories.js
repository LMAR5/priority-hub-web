import React, { useEffect, useState } from 'react';

import CategoryService from '../../services/CategoryService'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

const Categories = () => {

  const [loadingCategoryTable, setLoadingCategoryTable] = useState(true);
  const [lstCategories, setLstCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllCategories();
  })

  const getAllCategories = () => {
    CategoryService.getAllCategories().then((categorydata) => {
      setLstCategories(categorydata);
      setLoadingCategoryTable(false);
    }, []);
  }

  const renderCategoryTable = () => {

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>deleted</th>
            <th>createdby</th>
            <th>createddatetime</th>
            <th>lastupdateby</th>
            <th>lastupdatedatetime</th>
          </tr>
        </thead>
        <tbody>
          {lstCategories.map((info, idx) =>
            <tr key={idx}>
              <td>{info.Title}</td>
              <td>{info.category}</td>
              <td>{info.Status}</td>
              <td>{info.Priority}</td>
              <td>{info.DueDate}</td>
              <td>{info.LastUpdatedDateTime}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }


  const updateSearchTermBar = (event) => {
    //console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  const performSearch = () => {
    CategoryService.searchCategory(searchTerm).then((categorydata) => {
      console.log("Search Category response:", categorydata);
      //Update variable that stores the list of categories from backend.
      setLstCategories(categorydata);
      setLoadingCategoryTable(false);
    });
  }

  const renderSearchBar = () => {
    return (
      <InputGroup className="mb-1 mt-3">
        <Form.Control
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => { updateSearchTermBar(event) }} />
        <Button variant="primary" onClick={() => { performSearch() }}>Search</Button>
      </InputGroup>
    );
  }

  let contentTable = loadingCategoryTable ? <p>Loading...</p> : renderCategoryTable();
  let showSearchBard = renderSearchBar();

  return (
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