import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
import '../../assets/css/Home.css';


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

    const [modalShow, setModalShow] = useState(false);

    const [TaskName, setTaskName] = useState("");
    const [TaskDes, setTaskDes] = useState("");
    const [TaskCategory, setTaskCategory] = useState("");
    const [TaskDueDate, setTaskDueDate] = useState("");
    const [TaskNotes, setTaskNotes] = useState("");
    const today = new Date();

    function Create() {
        const task = {
            TaskName: TaskName,
            TaskDescription: TaskDes,
            TaskCategory: TaskCategory,
            TaskDueDate: TaskDueDate,
            TaskNotes: TaskNotes,
            DateCreated: today,
        };

        TaskService.createTask(task).then((data) => {
            if (data.serverStatus == 2) {
                MySwal.fire('Task Was successfuly created');
            } else {
                getAllTasksData();
                MySwal.fire('Task Creatation Failed', 'Something Went Wrong');
            }
        });

    }

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

    const DeleteTask = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "This action will delete this task.",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            confirmButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {

                MySwal.fire('Deleted!','Your task has been successfully deleted!','success');
            }
        });
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
                    {/* <Form.Group className='text-end'>
                        <Button variant="primary ms-2">Complete</Button>
                        <Button variant="danger ms-2">Delete</Button>
                    </Form.Group> */}
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
                            <Form.Control id='task_description' className='alert alert-warning' as="textarea" rows={6} value={selectedTaskById.Description} onChange={handleTaskChange} />
                        </Col>
                        <Col sm={6}>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control id='task_notes' className='alert alert-warning' as="textarea" rows={6} value={selectedTaskById.Notes} onChange={handleTaskChange} />
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
                        <Button variant="danger ms-2" onClick={() => { DeleteTask() }}>Delete</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }


    const sortTask = (catId, taskCatId, taskId, taskName) => {
        if (catId === taskCatId) {
            return (
                <tbody>
                    <tr>
                        <td className='d-grid'>
                            <Button className='taskButton' variant='light' onClick={() => { getTaskById(taskId) }}>{taskName}</Button>
                        </td>
                    </tr>
                </tbody>
            )
        }
    }

    const showTaskList = () => {
        return (
            <div className='taskTable'>
                <Table striped bordered hover>
                    {lstCategories.map((catInfo, catIdx) =>
                        <>
                            <thead>
                                <tr>
                                    <th key={catIdx}>{catInfo.Title}</th>
                                </tr>
                            </thead>
                            {lstTasks.map((taskInfo) =>
                                sortTask(catInfo.Id, taskInfo.CategoryId, taskInfo.Id, taskInfo.Title)
                            )}
                        </>
                    )}
                </Table>
            </div>
        )
    }

    const ShowHistory = (props) => {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        History
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h4>Completed</h4>
                        </Col>
                        <Col>
                            <h4>Deleted</h4>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const historyButton = () => {
        return (
            <>
                <div className='d-grid'>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        History
                    </Button>

                </div>

                <ShowHistory
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

            </>
        )
    }


    let showSelectedTaskContent = loadingDataIsReady ? renderViewTaskForm() : renderEditTaskForm();
    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();
    let showSearchBard = renderSearchBar();

    return (
        <div className='mb-5'>
            <Row className="mt-0">
                <Col sm={4} className='border border-top-0 border-end-0 p-3 text-center'>
                    <Row>
                        <Col>{showSearchBard}</Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col>
                            <Alert variant='warning' className='mt-4'>
                                {/* <h4>Here goes the list of tasks. </h4> */}
                                {showTaskList()}
                            </Alert>

                            {historyButton()}

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
                    <Form.Control size='lg' type="text" value={TaskName} onChange={(event) => { setTaskName(event.target.value) }} placeholder="Add your task here..." />
                </Col>
                <Col sm={6} md={6} lg={3} className='my-2'>
                    <Form.Select size='lg' value={TaskCategory} onChange={(event) => { setTaskCategory(event.target.value) }}>
                        <option>Select category</option>
                        <option value="1">Study</option>
                        <option value="2">Work</option>
                        <option value="3">Personal</option>
                        <option value="4">University</option>
                        <option value="5">Exercise</option>
                        <option value="6">Projects</option>
                        <option value="7">Home Improvement</option>
                        <option value="8">Pet</option>
                        <option value="9">Cooking</option>
                        <option value="10">Other</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className='border border-top-0 px-2 py-3 text-center'>
                <Col sm={6} md={7} lg={5}>
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text" value={TaskDes} onChange={(event) => { setTaskDes(event.target.value) }} placeholder="Task Description" />
                </Col>
                <Col>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="datetime-local" min="2023-10-20T00:00" max="2024-10-21T00:00" value={TaskDueDate} onChange={(event) => { setTaskDueDate(event.target.value) }} placeholder="Due Date" />
                </Col>
                <Col>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control type="text" value={TaskNotes} onChange={(event) => { setTaskNotes(event.target.value) }} placeholder="Notes" />
                </Col>
            </Row>
            <Row>
                <Col sm={6} md={6} lg={1} className='my-2' >
                    <Button variant="primary" size='lg' type="submit" onClick={() => { Create() }}>
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