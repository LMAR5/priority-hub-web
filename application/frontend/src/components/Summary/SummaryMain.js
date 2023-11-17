import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import SummaryService from '../../services/SummaryService';
import Global from '../Generic/GlobalConstants';

import SummaryTasksCompleted from './SummaryTasksCompleted';
import SummaryTimeSpent from './SummaryTimeSpent';

function SummaryMain() {
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingListDates, setLoadingListDates] = useState(true);
    const [lstDates, setLstDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        getListOfDates();
    }, []);

    const searchTermSummary =
        () => {
            let searchData = { searchkey: searchTerm }
            // Update list of dates
        }

    const getListOfDates =
        () => {
            SummaryService.getSummaryDateList().then((data) => {
                setLstDates(data.result);
                setLoadingListDates(false);
            });
        }

    const renderSearchBar =
        () => {
            return (
                <InputGroup className='mb-2'>
                    <Form.Control placeholder=
                        'Search...' value={searchTerm} onChange=
                        {
                            (event) => {
                                setSearchTerm(event.target.value)
                            }
                        } />
                    <Button variant="dark" onClick={() => { searchTermSummary() }}>
                        <i className="bi bi-search"></i>
                    </Button>
                </InputGroup>);
        }

    const renderListofDates = () => {
        return (
            <ListGroup>
                {lstDates.map((date, idx) =>
                    <ListGroup.Item key={idx} action variant='light' onClick={() => { setSelectedDate(date) }}>{(new Date(date)).toLocaleDateString('en-US', Global.dateOptions)}</ListGroup.Item>
                )}
            </ListGroup>
        );
    }

    let contentList = loadingListDates ? <Spinner animation='border' variant='dark' /> : renderListofDates();

    return (
        <div>
            <Row>
                <Col sm={12} md={3} lg={4} className='border-end'>
                    <Row>
                        <Col>{renderSearchBar()}</Col>
                    </Row>
                    <Row>
                        <h3>Dates</h3>
                        {contentList}
                    </Row>
                </Col>
                <Col sm={12} md={9} lg={8}>
                    <h3 className='text-center my-3'>{selectedDate == "" ? "Select a date" : (new Date(selectedDate)).toLocaleDateString('en-US', Global.dateOptions2)}</h3>
                    <SummaryTimeSpent />
                    <SummaryTasksCompleted />
                </Col>
            </Row>
        </div>
    );
}

export default SummaryMain;