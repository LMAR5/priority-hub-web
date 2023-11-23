import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardService from '../../services/DashboardService';

function TaskByStatus(props) {


    const [lstTaskByStatus, setTaskByStatus] = useState([]);
    // const data = [
    //     { name: 'Pending', value: 400 },
    //     { name: 'In Progress', value: 300 },
    //     { name: 'Complete', value: 300 },
    // ];

    useEffect(() => {
        getTaskByStatus(props.start, props.end);
    }, [props.start, props.end]);

    const getTaskByStatus = (start_date, end_date) => {
        let tempEndDate = new Date(end_date);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        tempEndDate = tempEndDate.toISOString().slice(0, 10);
        DashboardService.getTasksByStatus(start_date, tempEndDate).then((data) => {
            setTaskByStatus(data);
            console.log(data);
        });
    }

    const COLORS = ['#0088FE', '#00C49F', '#FF0000'];

    // const RADIAN = Math.PI / 180;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <Row>
                <Col>
                    <h2>Number of Tasks By Status</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={lstTaskByStatus}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label="Status"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="StatusNum"
                        >
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

