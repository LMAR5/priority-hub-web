import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ActivityTrackerService from '../../services/ActivityTrackerService';
import ActivityTrackerModel from '../../models/ActivityTrackerModel';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Global from '../Generic/GlobalConstants';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import TaskService from '../../services/TaskService';

function Stopwatch(props) {
    const [activityTrackerForm, setActivityTrackerForm] = useState(new ActivityTrackerModel());
    // state to store time
    const [time, setTime] = useState(0);
    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    // Method to start and stop timer
    const startAndStop = (mode) => {
        switch (mode) {
            case 'START':
                MySwal.fire({
                    title: 'Are you sure?',
                    text: milliseconds > 0 ? "This action will create a new tracking record for this task" : "This action will track your time for this task",
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Start',
                    confirmButtonColor: '#000'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const startDateTime = new Date();
                        const trackTitle = startDateTime.toLocaleDateString('en-US', Global.dateOptions) + " | " + startDateTime.toLocaleTimeString('en-US', Global.timeOptions);
                        startDateTime.setHours(startDateTime.getHours() - 8);
                        const newStartDateTime = startDateTime.toISOString().slice(0, 19);
                        activityTrackerForm.Title = trackTitle;
                        activityTrackerForm.StartTime = newStartDateTime;
                        activityTrackerForm.TaskId = props.taskData.Id;
                        activityTrackerForm.CreatedDateTime = newStartDateTime;
                        activityTrackerForm.LastUpdatedDateTime = newStartDateTime;
                        //Reset the timer
                        setTime(0);
                        //Start timer
                        setIsRunning(!isRunning);
                        ActivityTrackerService.startTrackTime(activityTrackerForm).then((data) => {
                            if (data.success) {
                                TaskService.updateStatusToInProgress(activityTrackerForm.TaskId).then((dataUpdate) => {
                                    console.log(dataUpdate);
                                })
                                setActivityTrackerForm(data.result[0]);
                                updateListActivityTrackers(data.result[0].Id);
                                MySwal.fire({ title: 'Started!', text: data.message, icon: 'success', confirmButtonColor: '#000' });
                            } else {
                                MySwal.fire({ title: 'Error!', text: data.message, icon: 'error', confirmButtonColor: '#000' });
                            }
                        });
                    }
                });
                break;
            default:
                //mode: STOP
                MySwal.fire({
                    title: 'Are you sure?',
                    text: "This action will stop the tracking of this task",
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Stop',
                    confirmButtonColor: '#000'
                }).then((result) => {
                    if (result.isConfirmed) {
                        //Stop the timer
                        setIsRunning(!isRunning);
                        const stopTrackTime = new Date(activityTrackerForm.StartTime);
                        stopTrackTime.setHours(stopTrackTime.getHours() - 8);
                        if (hours > 0) {
                            stopTrackTime.setHours(stopTrackTime.getHours() + hours);
                        }
                        if (minutes > 0) {
                            stopTrackTime.setMinutes(stopTrackTime.getMinutes() + minutes);
                        }
                        if (seconds > 0) {
                            stopTrackTime.setSeconds(stopTrackTime.getSeconds() + seconds);
                        }
                        const newStopDateTime = stopTrackTime.toISOString().slice(0, 19);
                        activityTrackerForm.StopTime = newStopDateTime;
                        activityTrackerForm.LastUpdatedDateTime = newStopDateTime;
                        ActivityTrackerService.stopTrackTime(activityTrackerForm).then((data) => {
                            if (data.success) {
                                //Reset the timer
                                //setTime(0);
                                //Re-initialize the variable of the activitytracker
                                setActivityTrackerForm(new ActivityTrackerModel());
                                updateListActivityTrackers(activityTrackerForm.Id);
                                MySwal.fire({ title: 'Stopped!', text: data.message, icon: 'success', confirmButtonColor: '#000' });
                            } else {
                                MySwal.fire({ title: 'Error!', text: data.message, icon: 'error', confirmButtonColor: '#000' });
                            }
                        });

                    }
                });
                break;
        }
    };

    const updateListActivityTrackers = (task_id) => {
        //Reset the timer
        setTime(0);
        props.updateLst(task_id);
    }

    return (
        <Row>
            <Col sm={6}>
                <Card className='text-center'>
                    <Card.Body>
                        <Card.Title>Stopwatch</Card.Title>
                        <Card.Text>
                            {hours}:{minutes.toString().padStart(2, "0")}:
                            {seconds.toString().padStart(2, "0")}:
                            {milliseconds.toString().padStart(2, "0")}
                        </Card.Text>
                        {props.isDisabled ? <Button variant='outline-dark' disabled>Start</Button> : isRunning ? <Button variant='outline-dark' disabled>Start</Button> : <Button variant='dark' onClick={() => { startAndStop('START') }}>Start</Button>}
                        {props.isDisabled ? <Button variant='outline-danger' className='ms-3' disabled>Stop</Button> : !isRunning ? <Button variant='outline-danger' className='ms-3' disabled>Stop</Button> : <Button variant='danger' className='ms-3' onClick={() => { startAndStop('STOP') }}>Stop</Button>}                        
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={6} className='activityTrackerList'>
                <b>Recorded activity</b>
                <ListGroup as="ol" numbered className='mt-1'>
                    {props.lstTrackers.length === 0 ? <span><em>No recorded activity</em></span> :
                        props.lstTrackers.map((item, idx) =>
                            <ListGroup.Item key={idx} as="li" className='d-flex justify-content-between align-items-start'>
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.Title}</div>
                                    {item.HoursSpent >= 1 ? item.HoursSpent + " h" : "0 h"}, {item.MinSpent > 0 ? item.MinSpent + " min" : "0 min"}, {item.SecSpent > 0 ? item.SecSpent + " sec" : "0 sec"}
                                </div>
                            </ListGroup.Item>
                        )}
                </ListGroup>
            </Col>
        </Row>
    );
}

export default Stopwatch;