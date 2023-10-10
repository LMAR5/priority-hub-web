import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import jsonData from './TasksJSONSample.json'
import TaskService from '../../services/TaskService'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Tasks = () => {

    const [loadingTaskTable, setLoadingTaskTable] = useState(true);
    const [lstTasks, setLstTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const renderTaskTable = () =>{

        return(
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>DueDate</th>
                    <th>Last modification</th>
                    </tr>
                </thead>
                <tbody>
                    {lstTasks.map((info, idx) => 
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
        setSearchTerm(event.target.value);
    }

    const performSearch = () => {
        TaskService.searchTasks(searchTerm).then((data) => {
            console.log("Search task response:",data);
            //Update variable that stores the list of tasks from backend.
            setLstTasks(data);
            setLoadingTaskTable(false);
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

    let contentTable = loadingTaskTable ? <p>Loading...</p> : renderTaskTable();
    let showSearchBard = renderSearchBar();

    return(
        <div>
            <Row>
                <Col md={{ span: 4, offset: 8 }}>{showSearchBard}</Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h1>List of tasks</h1>
                    {contentTable}
                </Col>
            </Row>
        </div>                
    );
};

export default Tasks;