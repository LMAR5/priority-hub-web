import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import GenericService from '../../services/GenericService';
import Row from 'react-bootstrap/Row';

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
    
    let showStatusContent = loadingBackStatus ? <h2>Loading...</h2> : renderStatusCheck();

    return(
        <div>            
            <Row className="mt-3 mb-3 text-center">
                <h1>Welcome to our Protototype App</h1>
            </Row>
            <Row>
            {showStatusContent}
            </Row>
        </div>
    );
}

export default Home;