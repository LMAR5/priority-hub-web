import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from 'recharts';

import SummaryService from '../../services/SummaryService';


function SummaryTimeSpent(props) {
    const [timeSpentData, setTimeSpentData] = useState([]);

    useEffect(() => {
        getTimeSpentData(props.inputDate);
    }, [props.inputDate]);

    const getTimeSpentData =
        (inputDate) => {
            if (inputDate) {
                let tempDate = new Date(inputDate);
                tempDate.setHours(tempDate.getHours() - 8);
                let start_date = tempDate.toISOString().slice(0, 10);
                tempDate.setDate(tempDate.getDate() + 1);
                let end_date = tempDate.toISOString().slice(0, 10);
                SummaryService.getSummaryTimeSpentPieData(start_date, end_date)
                    .then((data) => {
                        setTimeSpentData(data);
                    });
            }
        }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel =
        ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <ResponsiveContainer width="100%" height="100%">
                <Card className='mt-3'>
                    <Card.Header as="h5">Overall Time Spent Chart</Card.Header>
                    <Card.Body>
                        {timeSpentData.length === 0 ? <span><em>No recorded activity</em></span> :
                        <PieChart width={400} height={300}>
                            <Pie
                                data={timeSpentData}
                                isAnimationActive={false}
                                cx={200}
                                cy={150}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill='#8884d8'
                                dataKey='TimeHours'>
                                <LabelList className='pieLabel'
                                    dataKey='TaskTitle'
                                    position='outside'
                                    fontWeight={'bold'}
                                    angle='' />
                                {timeSpentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                        }                        
                    </Card.Body>
                </Card>
            </ResponsiveContainer>
        </div>


    );
}

export default SummaryTimeSpent;