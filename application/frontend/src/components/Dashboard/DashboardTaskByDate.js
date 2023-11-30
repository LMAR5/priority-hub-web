import React, {useEffect, useState} from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import DashboardService from '../../services/DashboardService';

function DashboardTaskByDate(props) {
  const [lstActivityTrackersChart, setLstActivityTrackersChart] = useState([]);

  useEffect(() => {
    getDataTrackersByDate(props.start, props.end);
  }, [props.start, props.end]);

  const getDataTrackersByDate =
      (start_date, end_date) => {
        let tempEndDate = new Date(end_date);
        tempEndDate.setDate(tempEndDate.getDate() + 1);
        tempEndDate = tempEndDate.toISOString().slice(0, 10);
        DashboardService.getActivityTrackersByDateChart(start_date, tempEndDate)
            .then((data) => {
              setLstActivityTrackersChart(data);
            });
      }

    return (
        <div className='mt-3'><h4>Number of Activity Tracker records by Date</h4>
            <ResponsiveContainer width={"100%"} height={300}>
                <LineChart
                    width={550}
                    height={300}
                    data={lstActivityTrackersChart}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='DateTitle' /><YAxis /><Tooltip /><Legend />
                    <Line type='monotone' dataKey='TrackerNum' name='Activity Tracker records' 
                    stroke='#000' fill='#000' activeDot=
                        {
                            { r: 8 }
                        } />
                </LineChart>
            </ResponsiveContainer>
        </div>
        );
}

export default DashboardTaskByDate;