import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import SummaryService from '../../services/SummaryService';

function SummaryTimeSpentTable(props) {
    const [timeSpentData, setTimeSpentData] = useState([]);

    useEffect(() => {
        getTimeSpentData(props.inputDate);
    }, [props.inputDate]);

    const getTimeSpentData = (inputDate) => {
        if (inputDate) {
            let tempDate = new Date(inputDate);
            tempDate.setHours(tempDate.getHours() - 8);
            let start_date = tempDate.toISOString().slice(0, 10);
            tempDate.setDate(tempDate.getDate() + 1);
            let end_date = tempDate.toISOString().slice(0, 10);
            SummaryService.getSummaryTimeSpentTableData(start_date, end_date).then((data) => {
                setTimeSpentData(data);
            });
        }
    }

    return (
        <Card className='mt-3'>
            <Card.Header as="h5">Overall Time Spent Table</Card.Header>
            <Card.Body className='summaryTimeTableScroll'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Task title</th>
                            <th>Time title</th>
                            <th>Time spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSpentData.length === 0 ? 
                        <tr className='fst-italic'><td colSpan={3}>No recorded activity</td></tr> :
                            timeSpentData.map((item, idx) =>
                                <tr key={idx}>
                                    <td>{item.TaskTitle}</td>
                                    <td>{item.ActivityTitle}</td>
                                    <td>
                                        {item.TimeHours >= 1 ? item.TimeHours + "h" : "0h"}, 
                                        {item.TimeMins > 0 ? item.TimeMins + "min" : "0min"}, 
                                        {item.TimeSecs > 0 ? item.TimeSecs + "sec" : "0sec"}
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default SummaryTimeSpentTable;