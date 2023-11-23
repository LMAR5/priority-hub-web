import React from 'react';
import Card from 'react-bootstrap/Card';

function SummaryTasksCompleted(props) {
    return (
        <Card className='mt-4'>
            <Card.Header as="h5">Number of Tasks Completed</Card.Header>
            <Card.Body>
                <Card.Text>
                    List of tasks completed
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SummaryTasksCompleted;