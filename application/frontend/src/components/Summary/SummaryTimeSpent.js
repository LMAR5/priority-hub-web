import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function SummaryTimeSpent(props) {
    return (
        <Card className='mt-3'>
            <Card.Header as="h5">Overall Time Spent</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Row>
                        <Col>Pie chart of the Number of Tasks by Date</Col>
                        <Col>Table with Time spent by task</Col>
                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SummaryTimeSpent;