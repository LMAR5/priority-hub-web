import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import GenericService from '../../services/GenericService';
import TaskService from '../../services/TaskService';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
    //State variables    
    const [loadingBackStatus, setLoadingBackStatus] = useState(false);  
    const [loadingSearchBar, setLoadingSearchBar] = useState(false);
    const [backStatus, setBackStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    function getBackendStatus(){
        GenericService.getCheckStatus().then((data) => {
            console.log("Backend status:", data);
            setBackStatus(data.message);
        });
    }

    function renderStatusCheck(){
        return(
            <Stack gap={2} direction='horizontal' className="mt-3">
                <Button variant="primary" onClick={() => {getBackendStatus()}}>Check Status</Button>
                <p>Status: {backStatus}</p>
            </Stack>
        );
    }

    function updateSearchTermBar(event){
        //console.log(event.target.value);
        setSearchTerm(event.target.value);
    }

    function performSearch(){
        TaskService.searchTasks().then((data) => {
            console.log("Search task response:",data);
            //Update variable that stores the list of tasks from backend.
        });
    }

    function renderSearchBar() {
        return(
            <InputGroup className="mb-3 mt-3">
                <Form.Control
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => {updateSearchTermBar(event)}} />
                <Button variant="primary" onClick={() => {performSearch()}}>Search</Button>
            </InputGroup>
        );
    }

    let showSearchBard = loadingSearchBar ? <h2>Loading...</h2> : renderSearchBar();
    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();

    return(
        <div>
            <Row>
                <Col md={{ span: 4, offset: 8 }}>{showSearchBard}</Col>
            </Row>
            <Row>
                {/* Put the table of tasks here */}
            </Row>
            <Row>
            {showStatusContent}
            </Row>
        </div>
    );
}

export default Home;