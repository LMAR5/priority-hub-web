import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import GenericService from '../../services/GenericService';
import TaskService from '../../services/TaskService';
import CategoryService from '../../services/CategoryService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function Home() {
    //State variables    
    const [loadingBackStatus, setLoadingBackStatus] = useState(false);  
    const [backStatus, setBackStatus] = useState("");
    const [lstCategories, setLstCategories] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState("");
          
    useEffect(() => {        
        getAllCategories();
    }, []);

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

    const getAllCategories = () => {
        CategoryService.getAllCategories().then((data) => {
            console.log(data);
            setLstCategories(data);
        });
    }

    const getTaskById = () => {
        TaskService.getTaskById(selectedTaskId).then((data) => {
            //Load task component
        });
    }
    
    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();
    let showSearchBard = renderSearchBar();

    return(
        <div>
            <Row className="mt-0">
                <Col sm={4} className='border border-top-0 border-end-0 p-3 text-center'>
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
                    <h4>Task #00</h4>
                    <Form className='mt-3'>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' />
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                {lstCategories.map((item, idx) =>
                                    <option key={idx} value={item.Title}>{item.Title}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type='text' />
                        </Form.Group>
                        <Form.Group as={Row} className='mt-2'>
                            <Col sm={6}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control className='alert alert-warning' as="textarea" rows={5} />
                            </Col>
                            <Col sm={6}>
                                <Form.Label>Notes</Form.Label>
                                <Form.Control className='alert alert-warning' as="textarea" rows={5} />
                            </Col>                            
                        </Form.Group>
                        <Form.Group>
                            <Alert variant='primary' className='mt-4'>
                                <h4>Here goes the stopwatch.</h4>
                            </Alert>
                        </Form.Group>
                        <Form.Group className='text-end'>
                            <Button variant="warning">Edit</Button>
                            <Button variant="primary ms-2">Complete</Button>
                            <Button variant="danger ms-2">Delete</Button>
                        </Form.Group>                        
                    </Form>
                </Col>
            </Row>
            <Row className='border border-top-0 px-2 py-3 text-center'>
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