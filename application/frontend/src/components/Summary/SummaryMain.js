import React, {useEffect, useState} from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import SummaryService from '../../services/SummaryService';
import Global from '../Generic/GlobalConstants';

import SummaryTasksCompleted from './SummaryTasksCompleted';
import SummaryTimeSpent from './SummaryTimeSpent';
import SummaryTimeSpentTable from './SummaryTimeSpentTable';

function SummaryMain() {
  const [loadingListDates, setLoadingListDates] = useState(true);
  const [lstDates, setLstDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    getListOfDates();
  }, []);

  const getListOfDates =
      () => {
        SummaryService.getSummaryDateList().then((data) => {
          setLstDates(data.result);
          setLoadingListDates(false);
        });
      }

  const renderListofDates = () => {
        return (
            <ListGroup className='summaryListScroll'>
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
                <Col sm={12} md={3} lg={3} className='border-end'>                    
                    <Row>
                        <h3>Dates</h3>
                        {contentList}
                    </Row>
                </Col>
                <Col sm={12} md={9} lg={9}>
                    <Row>
                        <Col>
                            <h3 className='text-center my-3'>{selectedDate === "" ? "Select a date" : (new Date(selectedDate)).toLocaleDateString('en-US', Global.dateOptions2)}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={12} lg={6}>
                            <SummaryTimeSpent inputDate={selectedDate} />
                        </Col>
                        <Col sm={12} md={12} lg={6}>
                            <SummaryTimeSpentTable inputDate={selectedDate} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SummaryTasksCompleted inputDate={selectedDate} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default SummaryMain;