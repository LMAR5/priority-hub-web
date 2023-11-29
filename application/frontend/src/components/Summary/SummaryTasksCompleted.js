import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import SummaryService from '../../services/SummaryService'



function SummaryTasksCompleted(props) {

    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect( ()=>{
        getCompletedTasksByDate(props.inputDate);
    },[props.inputDate])

    const getCompletedTasksByDate = (date) => {
        if(date){
            let tempDate = new Date(date);
            tempDate.setHours(tempDate.getHours() - 8);
            let start_date = tempDate.toISOString().slice(0, 10);
            tempDate.setDate(tempDate.getDate() + 1);
            let end_date = tempDate.toISOString().slice(0, 10);
            SummaryService.getCompletedTasks(start_date, end_date).then((data) => {
                setCompletedTasks(data);
            });
        };
       
    }

    return (
        <Card className='mt-4'>
            <Card.Header as="h5">List of Tasks Completed</Card.Header>
            <Card.Body>                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Task Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedTasks.length === 0 ? <tr className='fst-italic'><td colSpan={3}>No recorded activity</td></tr> :
                        completedTasks.map((item, idx) =>
                            <tr key={idx}>
                                <td>{item.Title}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default SummaryTasksCompleted;