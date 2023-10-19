import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import GenericService from '../../services/GenericService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



function Home() {
    //State variables    
    const [loadingBackStatus, setLoadingBackStatus] = useState(false);  
    const [backStatus, setBackStatus] = useState("");    

    const getBackendStatus = () => {
        GenericService.getCheckStatus().then((data) => {
            console.log("Backend status:", data);
            setBackStatus(data.message);
        });
    }

    const renderStatusCheck = () => {
        return(
            <Stack gap={2} direction='horizontal' className="mt-3">
                <Button variant="primary" onClick={() => {getBackendStatus()}}>Check Status</Button>                
                <p>Status: {backStatus}</p>
            </Stack>
        );
    }   

    const renderSearchBar = () => {
        return (
            <InputGroup className="mb-1 mt-3 px-2">
                <Form.Control
                    placeholder="Search..."
                    value=""
                    onChange={() => { }} />
                <Button variant="primary" onClick={() => { }}>Search</Button>
            </InputGroup>
        );
    }
    
    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();
    let showSearchBard = renderSearchBar();

    return(
        <div>
            <Row className="mt-0 text-center">
                <Col sm={4} className='border border-top-0 border-end-0 p-3'>
                    <Row>
                        <Col>{showSearchBard}</Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col>
                            <Alert variant='warning' className='mt-4'>
                                <h4>Here goes the list of tasks.</h4>
                            </Alert>
                        </Col>
                    </Row>
                </Col>
                <Col sm={8} className='border border-top-0 p-4'>
                    <h3 className='text-start'>Name of the task</h3>
                    <Alert variant='secondary' className='mt-4'>
                        <h3>In this space, load the task that the user selects from the list to the left.</h3>
                    </Alert>
                </Col>
            </Row>
            <Row className='border border-top-0 px-2 py-3'>
                <Col sm={12} md={12} lg={8} className='mt-2'>
                    <Form.Control size='lg' type="text" placeholder="Add your task here..."/>
                </Col>
                <Col sm={6} md={6} lg={3} className='my-2'>
                    <Form.Select size='lg'>
                        <option>Select category</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                    </Form.Select>
                </Col> 
                <Col sm={6} md={6} lg={1} className='my-2' >
                    <Button variant="primary" size='lg' type="">
                        Create
                    </Button>
                </Col>               
            </Row>
            <Row>
                {/* {showStatusContent} */}
            </Row>
        </div>
    );
}

export default Home;