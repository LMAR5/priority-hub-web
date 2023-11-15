import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import SummaryTimeSpent from './SummaryTimeSpent';
import SummaryTasksCompleted from './SummaryTasksCompleted';

function SummaryMain() {

    const [searchTerm, setSearchTerm] = useState("");

    const searchTermSummary = () => {
        let searchData = {
            searchkey: searchTerm
        }

        //Update list of dates
    }

    const renderSearchBar = () => {
        return (
            <InputGroup className="mb-2">
                <Form.Control
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => { setSearchTerm(event.target.value) }} />
                <Button variant="dark" onClick={() => { searchTermSummary() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </Button>
            </InputGroup>
        );
    }

    return (
        <div>
            <Row>
                <Col sm={12} md={3} lg={4} className='border-end'>
                    <Row>
                        <Col>{renderSearchBar()}</Col>
                    </Row>
                    <Row>
                        <h3>List of dates here</h3>
                    </Row>
                </Col>
                <Col sm={12} md={9} lg={8}>
                    <h2>Date</h2>
                    <SummaryTimeSpent />
                    <SummaryTasksCompleted />
                </Col>
            </Row>
        </div>
    );
}

export default SummaryMain;