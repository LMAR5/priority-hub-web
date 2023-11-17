import React from 'react';
import Card from 'react-bootstrap/Card';

function SummaryTimeSpentTable (props) {
    return(        
        <Card className='mt-3'>
            <Card.Header as="h5">Overall Time Spent Table</Card.Header>
            <Card.Body>
                <Card.Text>
                    Table with Time spent by task
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SummaryTimeSpentTable;