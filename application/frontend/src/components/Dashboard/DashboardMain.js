import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import DashboardTaskByCategory from './DashboardTaskByCategory';
import DashboardTaskByStatus from './DashboardTaskByStatus';

function DashboardMain() {
    return (
        <div>
            <h1>Dashboard view</h1>
            <Row className='mt-3'>
                <Col sm={4}>
                    <h3>Start date</h3>
                </Col>
                <Col sm={4}>
                    <h3>End date</h3>
                </Col>
                <Col sm={4}>
                    <Button variant="dark" size='lg' type="submit" onClick={() => { }}>
                        Search
                    </Button>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col>
                    <DashboardTaskByCategory />
                </Col>
                <Col>
                    <DashboardTaskByStatus />
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default DashboardMain;