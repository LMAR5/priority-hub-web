import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';

import DashboardService from '../../services/DashboardService';

function DashboardTaskByTimeSpent(props) {
  const [taskByTimeSpentData, setTaskByTimeSpentData] = useState([]);

  useEffect(() => {
    getTimeSpentData(props.start, props.end);
  }, [props.start, props.end]);

  const getTimeSpentData =
      (start_date, end_date) => {
        let tempEndDate = new Date(end_date);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        tempEndDate = tempEndDate.toISOString().slice(0, 10);
        DashboardService.getTasksByTimeSpentTable(start_date, tempEndDate)
            .then((data) => {
              setTaskByTimeSpentData(data);
            });
      }

    return (
        <div className='mt-3 dashboardTimeTableScroll'><h4>Activity Tracker records</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task title</th>
                        <th>Time title</th>
                        <th>Time spent</th>
                    </tr>
                </thead>
                <tbody>
                    {taskByTimeSpentData.length === 0 ?
                        <tr className='fst-italic'><td colSpan={4}>No recorded activity</td>
                        </tr> :
                        taskByTimeSpentData.map((item, idx) =>
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.TaskTitle} </td>
                                <td>{item.ActivityTitle}</td>
                                <td>
                                    {item.TimeHours >= 1 ? item.TimeHours + 'h' : '0h'},
                                    {item.TimeMins > 0 ? item.TimeMins + 'min' : '0min'},
                                    {item.TimeSecs > 0 ? item.TimeSecs + 'sec' : '0sec'} 
                                </td>
                            </tr>)
                    }
                </tbody>
            </Table></div>
    );
}

export default DashboardTaskByTimeSpent;