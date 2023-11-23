import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardService from '../../services/DashboardService';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

 function DashboardTaskByCategory(props){

    const [startDate, setStarDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [numCategories, setnumCategories] = useState([]);

    useEffect(  () => {
        getTasksByDate(props.start, props.end);
    }, [props.start, props.end]);

    
    const getTasksByDate = (start_date, end_date) => {
        let tempEndDate = new Date(end_date);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        tempEndDate = tempEndDate.toISOString().slice(0, 10);
        DashboardService.getTaskByCategory(start_date, tempEndDate).then((data) => {
            setnumCategories(data);
        });
    }

  
    return(
        <div className='mt-3'>
            <h3>Number Tasks By Category</h3>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart
                    width={550}
                    height={300}
                    data={numCategories}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="TaskCount" name="Tasks" fill="#8884d8" activeBar={<Rectangle fill="black" stroke="blue" />}  />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
 }

 export default DashboardTaskByCategory;