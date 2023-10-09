import React from 'react';
import Table from 'react-bootstrap/Table';
import jsonData from './TasksJSONSample.json'
import getAllTasks from '../../services/TaskService'

const Tasks = () => {
    const data = jsonData.map(
        (info) => {
            return(
                <tr>
                    <td>{info.title}</td>;
                    <td>{info.category}</td>;
                    <td>{info.status}</td>;
                    <td>{info.priority}</td>;
                    <td>{info.duedate}</td>;
                    <td>{info.lastupdateddatetime}</td>;
                </tr>
            )
        }
    )
    return(
        <div>
            <h1>Test</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                  <th>Title</th>;
                  <th>Category</th>;
                  <th>Status</th>;
                  <th>Priority</th>;
                  <th>DueDate</th>;
                  <th>Last modification.</th>;
                </tr>
            </thead>

            <tbody>
                {data};
            </tbody>
        </Table>
        </div>
        );
};

export default Tasks;