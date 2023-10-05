import React, { useState } from 'react';
import CustomNavBar from '../Layout/CustomNavBar';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import GenericService from '../../services/GenericService';

function Home() {
    //State variables    
    const [loadingBackStatus, setLoadingBackStatus] = useState(false);    
    const [backStatus, setBackStatus] = useState("");    

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

    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();

    return(
        <div>            
            <Container>
                {/* Put the table of tasks here */}
                {showStatusContent}
            </Container>
        </div>
    );
}

export default Home;