import React, {useEffect, useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip} from 'recharts';

import DashboardService from '../../services/DashboardService';

function TaskByStatus(props) {
  const [lstTaskByStatus, setTaskByStatus] = useState([]);

  useEffect(() => {
    getTaskByStatus(props.start, props.end);
  }, [props.start, props.end]);

  const getTaskByStatus =
      (start_date, end_date) => {
        let tempEndDate = new Date(end_date);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        tempEndDate = tempEndDate.toISOString().slice(0, 10);
        DashboardService.getTasksByStatus(start_date, tempEndDate)
            .then((data) => {
              setTaskByStatus(data);              
            });
      }

  const COLORS = ['#0088FE', '#00C49F', '#FF0000'];

    return (
        <ResponsiveContainer width='100%' height='300'>
            <Row className='mt-3'>
                <Col>
                    <h4>Number of Tasks By Status</h4>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={lstTaskByStatus}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="StatusNum">
                            {lstTaskByStatus.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </Col>
            </Row>
        </ResponsiveContainer>
    );
}

export default TaskByStatus;
