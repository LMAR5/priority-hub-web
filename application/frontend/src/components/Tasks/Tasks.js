import React from 'react';
import Table from 'react-bootstrap/Table';
import getAllTasks from '../../services/TaskService'

const Tasks = () => {
    return(
        <div>
            <h1>Test</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>DueDate</th>
                  <th>Last modification.</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
        </div>
        );
};

export default Tasks;