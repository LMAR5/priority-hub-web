import React from 'react';
import {Col, Row } from 'react-bootstrap';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


function TaskByStatus(){
  const data = [

      // Change values to nubmer of task by status
      { name: 'In Progress', value: 5 },
      { name: 'Completed', value: 6 },
      { name: 'Deleted', value: 2 },
    ];
    
    const COLORS = ['#0088FE', '#00C49F', '#FF0000'];
    
    const RADIAN = Math.PI / 180;
    
      return (
        <ResponsiveContainer width="100%" height="100%">
            <Row>
                <Col>
                    <PieChart width={400} height={400}>
                        <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                    </PieChart>
                </Col>
            </Row>
          
        </ResponsiveContainer>
      );
}

export default TaskByStatus;

