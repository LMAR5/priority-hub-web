import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import DashboardService from '../../services/DashboardService';

function DashboardTaskByTimeSpent(props) {

    const [taskByTimeSpentData, setTaskByTimeSpentData] = useState([]);

    useEffect(() => {
        getTimeSpentData(props.start, props.end);
    }, [props.start, props.end]);

    const getTimeSpentData = (start_date, end_date) => {
            DashboardService.getTasksByTimeSpentTable(start_date, end_date)
                .then((data) => {
                    setTaskByTimeSpentData(data);
                 })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setTaskByTimeSpentData([]);
                });
    }

    return(
        <div className='mt-3'>
            <h2>Number of Tasks By TimeSpent</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Task title</th>
                        <th>Time spent</th>
                    </tr>
                </thead>
                <tbody>
                    {taskByTimeSpentData.length === 0 ? 
                        <tr className='fst-italic'><td colSpan={3}>No recorded activity</td></tr> :
                            taskByTimeSpentData.map((item, idx) =>
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
        </div>
    );
}

export default DashboardTaskByTimeSpent;