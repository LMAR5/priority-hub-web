import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';
import Card from 'react-bootstrap/Card';

import SummaryService from '../../services/SummaryService';


function SummaryTimeSpent(props) {

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
            SummaryService.getSummaryTimeSpentPieData(start_date, end_date).then((data) => {
                setTimeSpentData(data);
            });
        }
    }

    // const data = [

    //     { name: 'Group A', value: 400 },
    //     { name: 'Group B', value: 300 },
    //     { name: 'Group C', value: 400 },
    //     { name: 'Group D', value: 200 },
    // ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <Card className='mt-3'>
                <Card.Header as="h5">Overall Time Spent Chart</Card.Header>
                <Card.Body>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={timeSpentData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="TimeHours"
                        >
                            {timeSpentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Tooltip />
                </Card.Body>
            </Card>
        </ResponsiveContainer>
    );
}

export default SummaryTimeSpent;