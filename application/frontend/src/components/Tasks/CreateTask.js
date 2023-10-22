import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import TaskService from '../../services/TaskService'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CategoryService from '../../services/CategoryService';

const CreateTask = () => {

  const [TaskName, setTaskName] = useState("");
  const [TaskDes, setTaskDes] = useState("");
  const [TaskCategory, setTaskCategory] = useState("");
  const [TaskDueDate, setTaskDueDate] = useState("");
  const [TaskNotes, setTaskNotes] = useState("");
  const today = new Date();

  function CreateTasks(){
    const task = {
      TaskName: TaskName,
      TaskDes: TaskDes,
      TaskCategory: TaskCategory,
      TaskDueDate: TaskDueDate,
      TaskNotes: TaskNotes,
      DateCreated: today,
    };
    fetch('api/TaskController/CreateTask', {
      method: 'Post',
      body: JSON.stringify(task),
    })

    .then(response => {
      console.log(response);
    });

    
  }


    return(
      <div className='d-flex justify-content-center'>
        <Form className = "CreateTask">
      <Form.Group className="TaskCreate" controlId="TaskName">
        <Form.Label>Task Name</Form.Label>
        <Form.Control type="Name" value={TaskName} onChange={(event) => {setTaskName(event.target.value)}} placeholder="Task Name"/>
      </Form.Group>

      <Form.Group className="TaskCreate" controlId="Task Description">
        <Form.Label>Task Description</Form.Label>
        <Form.Control type="Description" value={TaskDes} onChange={(event) => {setTaskDes(event.target.value)}} placeholder="Task Description"/>
      </Form.Group>

      <Form.Group className="TaskCreate" controlId="Task Description">
        <Form.Label>Select Category</Form.Label>
        <Form.Select aria-label="Category" value={TaskCategory} onChange={(event) => {setTaskCategory(event.target.value)}}>
          <option>Select Task Category</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="3">Personal</option>
          <option value="Personal">University</option>
          <option value="Exercise">Exercise</option>
          <option value="Projects">Projects</option>
          <option value="Home Improvement">Home Improvement</option>
          <option value="Pet">Pet</option>
          <option value="Cooking">Cooking</option>
          <option value="Other">Other</option>
        </Form.Select>
    </Form.Group>

    <Form.Group className="TaskCreate" controlId="Task Due">
        <Form.Label>Task Due Date</Form.Label>
        <Form.Control type="datetime-local" min="2023-10-20T00:00" max="2024-10-21T00:00" value={TaskDueDate} onChange={(event) => {setTaskDueDate(event.target.value)}} placeholder="Due Date"/>
    </Form.Group>

    <Form.Group className="TaskCreate" controlId="Task Notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control type="Description" value={TaskNotes} onChange={(event) => {setTaskNotes(event.target.value)}} placeholder="Notes"/>
    </Form.Group>


     
      <Button variant="primary" type="submit" onClick={() => { CreateTasks()}}>
        Create Task
      </Button>
       </Form>
       </div>

    );
 
}

export default CreateTask;