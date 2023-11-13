import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import DashboardTaskByCategory from './DashboardTaskByCategory';
import DashboardTaskByStatus from './DashboardTaskByStatus';
import DashboardTaskByDate from './DashboardTaskByDate';
import Form from 'react-bootstrap/Form';

function DashboardMain() {

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [todayDate, setTodayDate] = useState(new Date());
    return (        
        <div>
            <h2>Dashboard view</h2>
            <Form.Group as={Row} className='my-4'>
                <Form.Label column sm={1}>Start date</Form.Label>
                <Col sm={3}>                    
                    <Form.Control type="datetime-local" min="2023-10-20T00:00" max={todayDate.toISOString().slice(0,16)} value={startDate} onChange={(event) => { setStartDate(event.target.value) }} placeholder="Start date" />
                </Col>
                <Form.Label column sm={1}>End date</Form.Label>
                <Col sm={3}>
                    <Form.Control type="datetime-local" min="2023-10-20T00:00" max={todayDate.toISOString().slice(0,16)} value={endDate} onChange={(event) => { setEndDate(event.target.value) }} placeholder="End date" />
                </Col>
                <Col sm={4} className='text-center'>
                    <Button variant="dark" type="submit" onClick={() => { }}>
                        Search
                    </Button>
                </Col>
            </Form.Group>
            <Row className='mt-4'>
                <Col>
                    <DashboardTaskByCategory />
                </Col>
                <Col>
                    <DashboardTaskByStatus />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DashboardTaskByDate start={startDate} end={endDate} />
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default DashboardMain;