import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import GenericService from '../../services/GenericService';
import TaskService from '../../services/TaskService';
import CategoryService from '../../services/CategoryService';
import TaskModel from '../../models/TaskModel';
import CategoryModel from '../../models/CategoryModel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import ActivityTrackerService from '../../services/ActivityTrackerService';


function Home() {
    //State variables
    const [loadingBackStatus, setLoadingBackStatus] = useState(false);
    const [loadingDataIsReady, setLoadingDataIsReady] = useState(true);    
    const [backStatus, setBackStatus] = useState("");
    const [lstCategories, setLstCategories] = useState([]);
    const [lstTasks, setLstTasks] = useState([]);
    const [lstActivityTrackers, setLstActivityTrackers] = useState([]);

    const [categoryForm, setCategoryForm] = useState(new CategoryModel());
    const [selectedTaskById, setSelectedTaskById] = useState(new TaskModel());
    const [showEditButton, setShowEditButton] = useState(false);
    
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        getAllCategories();
    }, []);

    const getBackendStatus = () => {
        GenericService.getCheckStatus().then((data) => {            
            setBackStatus(data.message);
        });
    }

    const renderStatusCheck = () => {
        return (
            <Stack gap={2} direction='horizontal' className="mt-3">
                <Button variant="primary" onClick={() => { getBackendStatus() }}>Check Status</Button>
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

    const getAllTasksData = () => {
        TaskService.getAllTasks().then((data) => {
            setLstTasks(data);
        });
    }

    const getAllCategories = () => {
        CategoryService.getAllCategories().then((data) => {
            setLstCategories(data);
            getAllTasksData();
        });
    }

    const getCategoryById = (cat_id) => {
        CategoryService.getCategoryById(cat_id).then((data) => {
            setCategoryForm(data[0]);
            setLoadingDataIsReady(true);
            setShowEditButton(true);
        });
    }

    const getActivityTrackersById = (task_id) => {
        ActivityTrackerService.getAllActivityTrackersByTaskId(task_id).then((data) => {
            console.log(data);
            setLstActivityTrackers(data);
        });
    }

    const getTaskById = (task_id) => {
        TaskService.getTaskById(task_id).then((data) => {            
            setSelectedTaskById(data[0]);
            getCategoryById(data[0].CategoryId);
            getActivityTrackersById(data[0].Id);
        });
    }

    

    const handleTaskChange = (event) => {
        let taskObj = new TaskModel();
        taskObj.Id = selectedTaskById.Id;
        taskObj.Title = selectedTaskById.Title;
        taskObj.Description = selectedTaskById.Description;
        taskObj.CategoryId = selectedTaskById.CategoryId;
        taskObj.UserId = selectedTaskById.UserId;
        taskObj.Status = selectedTaskById.Status;
        taskObj.Priority = selectedTaskById.Priority;
        taskObj.Completed = selectedTaskById.Completed;
        taskObj.Deleted = selectedTaskById.Deleted;
        taskObj.IsFavorite = selectedTaskById.IsFavorite;
        taskObj.DueDate = selectedTaskById.DueDate;
        taskObj.Notes = selectedTaskById.Notes;
        taskObj.CreatedBy = selectedTaskById.CreatedBy;
        taskObj.CreatedDateTime = selectedTaskById.CreatedDateTime;
        taskObj.LastUpdatedBy = selectedTaskById.LastUpdatedBy;
        taskObj.LastUpdatedDateTime = selectedTaskById.LastUpdatedDateTime;
        switch (event.target.id) {
            case 'task_title':
                taskObj.Title = event.target.value;
                break;
            case 'task_categoryid':
                taskObj.CategoryId = event.target.value;
                let catObj = new CategoryModel();
                catObj.Id = event.target.value;
                let targetCategory = lstCategories.filter((cat) => cat.Id == event.target.value)[0];
                catObj.Title = targetCategory.Title;
                catObj.Description = targetCategory.Description;
                catObj.Deleted = 0;
                catObj.CreatedBy = targetCategory.CreatedBy;
                catObj.CreatedDateTime = targetCategory.CreatedDateTime;
                catObj.LastUpdatedBy = targetCategory.LastUpdatedBy;
                catObj.LastUpdatedDateTime = targetCategory.LastUpdatedDateTime;
                setCategoryForm(catObj);
                break;
            case 'task_duedate':
                taskObj.DueDate = event.target.value;
                break;
            case 'task_description':
                taskObj.Description = event.target.value;
                break;
            case 'task_notes':
                taskObj.Notes = event.target.value;
                break;
            default:
                break;
        }
        setSelectedTaskById(taskObj);    
    }

    const HandleSaveChanges = (event) => {
        event.preventDefault();
        MySwal.fire({
            title: 'Are you sure?',
            text: "This action will update this task.",
            icon: 'warning',           
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save',
            confirmButtonColor: '#3085d6'
          }).then((result) => {
            if (result.isConfirmed) {
                TaskService.updateTask(selectedTaskById).then((data) => {
                    if (data.serverStatus == 2) {
                        getAllTasksData();
                        MySwal.fire('Updated!', 'Your task has been updated', 'success');
                    }
                });
            }
          })
    }

    const renderViewTaskForm = () => {
        return (
            <div>
                <Row>
                    <Col sm={8}>
                        <h4>Task #{selectedTaskById.Id}</h4>
                    </Col>
                    {showEditButton ?
                        <Col sm={4} className='text-end'>
                            <Button variant="warning" onClick={() => { setLoadingDataIsReady(!loadingDataIsReady) }}>Edit</Button>
                        </Col> : <span></span>
                    }
                </Row>
                <Form className='mt-3'>
                    <Form.Group as={Row}>
                        <Col sm={8}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control id='task_title' type='text' maxLength={50} onChange={handleTaskChange} value={selectedTaskById.Title} disabled />
                        </Col>
                        <Col sm={4}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select id='task_categoryid' disabled>
                                <option defaultValue={categoryForm.Id}>{categoryForm.Title}</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control id='task_duedate' type='datetime-local' onChange={handleTaskChange} value={selectedTaskById.DueDate.slice(0, 16)} disabled />
                    </Form.Group>
                    <Form.Group as={Row} className='mt-2'>
                        <Col sm={6}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control id='task_description' as="textarea" rows={8} value={selectedTaskById.Description} onChange={handleTaskChange} disabled />
                        </Col>
                        <Col sm={6}>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control id='task_notes' as="textarea" rows={8} value={selectedTaskById.Notes} onChange={handleTaskChange} disabled />
                        </Col>
                    </Form.Group>
                    <Form.Group className='mt-2 p-2'>
                        <div className='row alert alert-secondary'>
                            <Col sm={6}>
                                <Card className='text-center'>
                                    <Card.Body>
                                        <Card.Title>Stopwatch</Card.Title>
                                        <Card.Text>00:00:00</Card.Text>
                                        <Button variant='outline-primary'>Start</Button>
                                        <Button variant='outline-warning' className='ms-3'>Pause</Button>
                                        <Button variant='outline-danger' className='ms-3'>Stop</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={6}>
                                <b>Activity tracker</b>
                                <ListGroup as="ol" numbered className='mt-1'>
                                    {lstActivityTrackers.map((item, idx) => 
                                        <ListGroup.Item key={idx} as="li" className='d-flex justify-content-between align-items-start'>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Time {item.Id}</div>
                                                {item.StartTime}
                                            </div>
                                        </ListGroup.Item>
                                    )}                                    
                                </ListGroup>
                            </Col>
                        </div>                        
                        {/* <Alert variant='secondary' className='mt-4'>                            
                        </Alert>                         */}
                    </Form.Group>
                    <Form.Group className='text-end'>
                        <Button variant="primary ms-2">Complete</Button>
                        <Button variant="danger ms-2">Delete</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    const renderEditTaskForm = () => {
        return (
            <div>
                <h4>Task #{selectedTaskById.Id}</h4>
                <Form className='mt-3' onSubmit={HandleSaveChanges}>
                    <Form.Group as={Row}>
                        <Col sm={8}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control id='task_title' type='text' maxLength={50} onChange={handleTaskChange} value={selectedTaskById.Title} />
                        </Col>
                        <Col sm={4}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select id='task_categoryid' onChange={handleTaskChange} value={selectedTaskById.CategoryId} >
                                {lstCategories.map((item, idx) =>
                                    <option key={idx} value={item.Id}>{item.Title}</option>
                                )}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group className='mt-2'>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control id='task_duedate' type='datetime-local' onChange={handleTaskChange} value={selectedTaskById.DueDate.slice(0, 16)} />
                        {/* {selectedTaskById.DueDate} */}
                    </Form.Group>
                    <Form.Group as={Row} className='mt-2'>
                        <Col sm={6}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control id='task_description' className='alert alert-warning' as="textarea" rows={8} value={selectedTaskById.Description} onChange={handleTaskChange} />
                        </Col>
                        <Col sm={6}>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control id='task_notes' className='alert alert-warning' as="textarea" rows={8} value={selectedTaskById.Notes} onChange={handleTaskChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Alert variant='primary' className='mt-4'>
                            <h4>Here goes the stopwatch.</h4>
                        </Alert>
                    </Form.Group>
                    <Form.Group className='text-end'>
                        <Button variant="success" type='submit' >Save changes</Button>
                        <Button variant="primary ms-2">Complete</Button>
                        <Button variant="danger ms-2">Delete</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    

    let showSelectedTaskContent = loadingDataIsReady ? renderViewTaskForm() : renderEditTaskForm();
    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();
    let showSearchBard = renderSearchBar();

    return (
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
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lstTasks.map((info, idx) =>
                                            <tr key={idx}>
                                                <td><Button variant='primary' onClick={() => { getTaskById(info.Id) }}>{info.Title}</Button></td>
                                                
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Alert>
                            {/* <h5>Buttons for testing JIRA PH-41</h5>
                            <Button variant='primary' onClick={() => { getTaskById(2) }}>Get Task ID 2</Button>
                            <Button className='ms-2' variant='primary' onClick={() => { getTaskById(11) }}>Get Task ID 11</Button> */}
                        </Col>
                    </Row>
                </Col>
                <Col sm={8} className='border border-top-0 p-4'>
                    {showSelectedTaskContent}
                </Col>
            </Row>
            <Row className='border border-top-0 px-2 py-3 text-center'>
                <Col sm={12} md={12} lg={8} className='mt-2'>
                    <Form.Control size='lg' type="text" placeholder="Add your task here..." />
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