import React from 'react';
import Card from 'react-bootstrap/Card';

function SummaryTimeSpent(props) {
    return (
        <Card className='mt-3'>
            <Card.Header as="h5">Overall Time Spent Chart</Card.Header>
            <Card.Body>
                <Card.Text>
                    Pie chart with the List of Tasks by Date
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SummaryTimeSpent;