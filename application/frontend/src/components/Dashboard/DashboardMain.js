import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardTaskByCategory from './DashboardTaskByCategory';
import DashboardTaskByStatus from './DashboardTaskByStatus';
import DashboardTaskByDate from './DashboardTaskByDate';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function DashboardMain() {
    var initDate = new Date();
    const [startDate, setStartDate] = useState(formatDate(initDate.setDate(initDate.getDate() - 7)));
    const [endDate, setEndDate] = useState(formatDate(new Date()));
    const MySwal = withReactContent(Swal);

    const formatTodayDate = () => {
        let tmpDate = new Date();
        tmpDate.setHours(tmpDate.getHours() - 8);
        return tmpDate.toISOString().slice(0, 10);
    }

    const updateStartDate = (value) => {
        if (!value) {
            MySwal.fire({ title: 'Start date', text: 'Provide a real date', icon: 'info', confirmButtonColor: '#000' });
        } else {
            setStartDate(value);
        }
    }

    const updateEndDate = (value) => {
        if (!value) {
            MySwal.fire({ title: 'End date', text: 'Provide a real date', icon: 'info', confirmButtonColor: '#000' });
        } else {
            setEndDate(value);
        }
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <Form.Group as={Row} className='my-4'>
                <Form.Label column sm={1}><strong>Start date</strong></Form.Label>
                <Col sm={5}>
                    <Form.Control type="date" min="2023-08-20" max={formatTodayDate()} value={startDate} onChange={(event) => { updateStartDate(event.target.value) }} />
                </Col>
                <Form.Label column sm={1}><strong>End date</strong></Form.Label>
                <Col sm={5}>
                    <Form.Control type="date" min="2023-08-20" max={formatTodayDate()} value={endDate} onChange={(event) => { updateEndDate(event.target.value) }} />
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