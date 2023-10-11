import React from 'react';
import Table from 'react-bootstrap/Table';

import JsonData from './CategoriesJSONSample.json';


function CategoriesTable() {

  //Maps all the elements from the JSON file to be used later
  const Data = JsonData.map(
    (info, idx) => {
      return (
        <tr key={idx}>
          <td>{info.id}</td>
          <td>{info.title}</td>
          <td>{info.description}</td>
          <td>{info.deleted}</td>
          <td>{info.createdby}</td>
          <td>{info.createddatetime}</td>
          <td>{info.lastupdatedby}</td>
          <td>{info.lastupdateddatetime}</td>
        </tr>
      )
    }
  )

  //Display each section
  return (
    <div>
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

          {/* Calls the data map to get elements for each column */}
          {Data}

        </tbody>
      </Table>
    </div>
  )
};

export default CategoriesTable;