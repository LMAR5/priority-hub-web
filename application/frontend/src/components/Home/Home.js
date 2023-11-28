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
import Col from 'react-bootstrap/Col';
import Global from '../Generic/GlobalConstants';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import ActivityTrackerService from '../../services/ActivityTrackerService';
import '../../assets/css/Home.css';
import Stopwatch from './Stopwatch';


function Home() {
    //State variables
    const [loadingBackStatus, setLoadingBackStatus] = useState(false);
    const [loadingDataIsReady, setLoadingDataIsReady] = useState(true);
    const [backStatus, setBackStatus] = useState("");
    const [lstCategories, setLstCategories] = useState([]);
    const [lstTasks, setLstTasks] = useState([]);
    const [lstDelTasks, setDelTasks] = useState([]);
    const [lstComplTasks, setComplTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [lstActivityTrackers, setLstActivityTrackers] = useState([]);
    const [updActivityTracker, setUpdActivityTracker] = useState(false);

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

    const Create = () => {

        if (isEmpty(TaskName) || isEmpty(TaskCategory) || isEmpty(TaskDueDate)) {
            MySwal.fire({
                title: 'Create task',
                text: 'Complete all fields.',
                icon: 'warning',
                confirmButtonColor: '#000'
            });
        } else {
            const task = {
                TaskName: TaskName,
                TaskDescription: TaskDes,
                TaskCategory: TaskCategory,
                TaskDueDate: TaskDueDate,
                TaskNotes: TaskNotes,
                DateCreated: today,
            };

            MySwal.fire({
                title: 'Are you sure?',
                text: "This action will create a task.",
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                confirmButtonText: 'Create task',
                confirmButtonColor: '#000'
            }).then((result) => {
                if (result.isConfirmed) {
                    TaskService.createTask(task).then((data) => {
                        if (data.serverStatus == 2) {
                            getAllTasksData();
                            setTaskName("");
                            setTaskCategory("");
                            setTaskDueDate("");
                            MySwal.fire({ title: 'Created!', text: 'Task was successfuly created', icon: 'success', confirmButtonColor: '#000' });
                        } else {
                            getAllTasksData();
                            MySwal.fire({ title: 'Error!', text: 'Task creation failed.', icon: 'error', confirmButtonColor: '#000' });
                        }
                    });
                }
            })
        }
    }

    const MySwal = withReactContent(Swal);

    useEffect(() => {
        getAllCategories();
    }, []);

    const isEmpty = (str) => {
        return (!str || str.length === 0);
    }

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

    const searchTermTasks = () => {
        let searchData = {
            searchkey: searchTerm
        }

        TaskService.searchTasks(searchData).then((data) => {
            setLstTasks(data);
        });
    }

    const renderSearchBar = () => {
        return (
            <InputGroup className="mb-1 mt-3">
                <Form.Control
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => { setSearchTerm(event.target.value) }} />
                <Button variant="dark" onClick={() => { searchTermTasks() }}>
                    <i className="bi bi-search"></i>
                </Button>
            </InputGroup>
        );
    }

    const getAllTasksData = () => {
        TaskService.getAllTasks().then((data) => {
            setLstTasks(data);
        });
    }

    const getDeletedTasks = () => {
        TaskService.getDeletedTask().then((data) => {
            setDelTasks(data);
        });
    }

    const getComplTasks = () => {
        TaskService.getCompletedTask().then((data) => {
            setComplTasks(data);
        });
    }

    const getAllCategories = () => {
        CategoryService.getAllCategories().then((data) => {
            setLstCategories(data);
            getAllTasksData();
            getDeletedTasks();
            getComplTasks();
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

    const updateListActivityTrackersById = () => {
        ActivityTrackerService.getAllActivityTrackersByTaskId(selectedTaskById.Id).then((data) => {
            setLstActivityTrackers(data);
        });
    }

    const getTaskById = (task_id) => {
        TaskService.getTaskById(task_id).then((data) => {
            setSelectedTaskById(data[0]);
            getCategoryById(data[0].CategoryId);
            setUpdActivityTracker(!updActivityTracker);
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
            confirmButtonColor: '#000'
        }).then((result) => {
            if (result.isConfirmed) {
                TaskService.updateTask(selectedTaskById).then((data) => {
                    if (data.serverStatus == 2) {
                        getAllTasksData();
                        MySwal.fire({ title: 'Updated!', text: 'Your task has been updated.', icon: 'success', confirmButtonColor: '#000' });
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
            confirmButtonColor: '#000'
        }).then((result) => {
            if (result.isConfirmed) {
                TaskService.deleteTask(selectedTaskById).then((data) => {
                    if (data.serverStatus == 2) {
                        getAllTasksData();
                        getDeletedTasks();
                        setLoadingDataIsReady(true);
                        setShowEditButton(false);
                        setSelectedTaskById(new TaskModel());
                        MySwal.fire({ title: 'Deleted!', text: 'Your task has been successfully deleted!', icon: 'success', confirmButtonColor: '#000' });
                    }
                });
            }
        });
    }

    const CompleteTask = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "This action will complete this task.",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Complete',
            confirmButtonColor: '#000'
        }).then((result) => {
            if (result.isConfirmed) {
                TaskService.completeTask(selectedTaskById).then((data) => {
                    if (data.serverStatus == 2) {
                        getAllTasksData();
                        getComplTasks();
                        setLoadingDataIsReady(true);
                        setShowEditButton(false);
                        setSelectedTaskById(new TaskModel());
                        MySwal.fire({ title: 'Complete!', text: 'Your task has been successfully completed!', icon: 'success', confirmButtonColor: '#000' });
                    }
                });
            }
        });
    }

    const undoChanges = (taskData) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "This action will undo your changes.",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Undo changes',
            confirmButtonColor: '#000'
        }).then((result) => {
            if (result.isConfirmed) {
                setShowEditButton(true);
                setLoadingDataIsReady(true);
                getTaskById(taskData.Id);
                MySwal.fire({ title: 'Done!', text: 'Your changes have been removed!', icon: 'success', confirmButtonColor: '#000' });
            }
        });
    }

    const renderViewTaskForm = () => {
        return (
            <div>
                <Row>
                    <Col sm={8}>
                        <Stack direction="horizontal" gap={3}>
                            <h4>Task details</h4>
                            {selectedTaskById.Status === 'In Progress' ? <Badge bg="primary" className="mb-2">In Progress</Badge> : <span></span>}
                        </Stack>
                    </Col>
                    {showEditButton ?
                        <Col sm={4} className='text-end'>
                            <Button data-testid="viewform_edit_btn" className='' variant="dark" onClick={() => { setLoadingDataIsReady(!loadingDataIsReady) }}>Edit</Button>
                        </Col> : <span></span>
                    }
                </Row>
                <Form className='mt-3'>
                    <Form.Group as={Row}>
                        <Col sm={8}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control data-testid="view_task_title" id='task_title' type='text' maxLength={50} onChange={handleTaskChange} value={selectedTaskById.Title} disabled />
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
                    <Form.Group className='mt-3 px-4 py-3 alert alert-secondary'>
                        <Row className='mb-1'>
                            <h5>Activity tracker</h5>
                        </Row>
                        <Row>
                            <Stopwatch isDisabled={true} taskData={selectedTaskById} lstTrackers={lstActivityTrackers} updateLst={updateListActivityTrackersById} />
                        </Row>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    const renderEditTaskForm = () => {
        return (
            <div>
                <Row>
                    <Col sm={8}>
                        <h4>Task details</h4>
                        {selectedTaskById.Status === 'In Progress' ? <Badge bg="primary">In Progress</Badge> : <span></span>}
                    </Col>
                    {!loadingDataIsReady ?
                        <Col sm={4} className='text-end'>
                            <Button className='btn bg-dark-subtle border border-dark-subtle' variant="" onClick={() => { undoChanges(selectedTaskById) }}>Undo</Button>
                        </Col> : <span></span>
                    }
                </Row>
                <Form className='mt-3' onSubmit={HandleSaveChanges}>
                    <Form.Group as={Row}>
                        <Col sm={8}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control data-testid="editform_edit_btn" id='task_title' type='text' maxLength={50} onChange={handleTaskChange} value={selectedTaskById.Title} />
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
                    <Form.Group className='mt-2 px-4 py-3 alert alert-light'>
                        <Row className='mb-1'>
                            <h5>Activity tracker</h5>
                        </Row>
                        <Row>
                            <Stopwatch isDisabled={false} taskData={selectedTaskById} lstTrackers={lstActivityTrackers} updateLst={updateListActivityTrackersById} />
                        </Row>
                    </Form.Group>
                    <Form.Group className='text-end'>
                        <Button className="btn bg-dark-subtle border border-dark-subtle" variant='' type='submit' >Save changes</Button>
                        <Button className="btn bg-primary-subtle border border-primary-subtle ms-2" variant='' onClick={() => { CompleteTask() }} >Complete</Button>
                        <Button className="btn bg-danger-subtle border border-danger-subtle ms-2" variant='' onClick={() => { DeleteTask() }}>Delete</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    const sortTask = (catId, taskCatId, taskId, taskName) => {
        if (catId === taskCatId) {
            return (
                <tr key={taskId}>
                    <td className='d-grid'>
                        <Button className='rounded-0' variant='light' onClick={() => { getTaskById(taskId) }}>{taskName}</Button>
                    </td>
                </tr>
            )
        }
    }

    const showTaskList = () => {
        return (
            <div className='taskTable text-center'>
                <Table striped bordered hover>
                    {lstCategories.map((catInfo, catIdx) =>
                        catInfo.Id !== 0 ?
                            <>
                                <thead>
                                    <tr className='table-secondary border-0'>
                                        <th className='border border-0' key={catIdx}>{catInfo.Title}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lstTasks.map((taskInfo) =>
                                        sortTask(catInfo.Id, taskInfo.CategoryId, taskInfo.Id, taskInfo.Title)
                                    )}
                                </tbody>
                            </>
                            : ""
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
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        History of tasks
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <h4>Completed</h4>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Completed date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lstComplTasks.length !== 0 ? lstComplTasks.map((info, idx) =>
                                        <tr key={idx}>
                                            <td className='border-0'>{info.Title}</td>
                                            <td className='border-0'>{(new Date(info.LastUpdatedDateTime)).toLocaleDateString('en-US', Global.dateOptions)}</td>
                                        </tr>
                                    ) : <tr><em className='p-0'>No results</em></tr>}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className='border-start'>
                            <h4>Deleted</h4>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Deleted date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lstDelTasks.length !== 0 ? lstDelTasks.map((info, idx) =>
                                        <tr key={idx}>
                                            <td className='border-0'>{info.Title}</td>
                                            <td className='border-0'>{(new Date(info.LastUpdatedDateTime)).toLocaleDateString('en-US', Global.dateOptions)}</td>
                                        </tr>
                                    ) : <tr><em className='p-0'>No results</em></tr>}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='dark' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const historyButton = () => {
        return (
            <>
                <div className='mb-2'>
                    <Button variant="dark" className='text-start' onClick={() => setModalShow(true)}>
                        History of tasks
                    </Button>
                </div>
                <ShowHistory show={modalShow} onHide={() => setModalShow(false)} />
            </>
        )
    }

    let showSelectedTaskContent = loadingDataIsReady ? renderViewTaskForm() : renderEditTaskForm();
    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();

    return (
        <div className='mb-5'>
            <Row className="mt-0">
                <Col sm={12} md={3} lg={4} className='border border-top-0 border-end-0 px-4 text-center'>
                    <Row>
                        <Col>{renderSearchBar()}</Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className='text-start'>
                            {historyButton()}
                            {showTaskList()}
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} md={9} lg={8} className='border border-top-0 p-4'>
                    {showSelectedTaskContent}
                </Col>
            </Row>
            <Row className='border border-top-0 px-2 py-3 text-center'>
                <Col sm={12} md={12} lg={4} className='mt-2'>
                    <Form.Control data-testid="create_task_title" size='lg' type="text" value={TaskName} onChange={(event) => { setTaskName(event.target.value) }} placeholder="Add your task here..." />
                </Col>
                <Col sm={12} md={12} lg={4} className='mt-2'>
                    <Form.Control data-testid="create_duedate_input" size='lg' type="datetime-local" min="2023-10-20T00:00" max="2024-10-21T00:00" value={TaskDueDate} onChange={(event) => { setTaskDueDate(event.target.value) }} placeholder="Due Date" />
                </Col>
                <Col sm={6} md={6} lg={3} className='my-2'>
                    <Form.Select data-testid="create_cat_select" size='lg' value={TaskCategory} onChange={(event) => { setTaskCategory(event.target.value) }}>
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
                <Col sm={6} md={6} lg={1} className='mt-2 ps-0'>
                    <Button data-testid="create_btn" variant="dark" size='lg' type="submit" onClick={() => { Create() }}>
                        Create
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Home;