import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';

function LandingPageMain () {
    return(
        <div>
            <Row>
                <Container className='p-4 mt-3 bg-light rounded-3'>
                    <h1 className='header'>Priority Hub Landing page</h1>
                </Container>
            </Row>
            <Row className='mt-4' style={{ height: '150px' }}>
                <Col>
                    <h2>Feature 1</h2>
                    <p>Description of feature and a picture maybe</p>
                </Col>
            </Row>
            <Row className='mt-4' style={{ height: '150px' }}>
                <Col>
                    <h2>Feature 2</h2>
                    <p>Description of feature and a picture maybe</p>
                </Col>
            </Row>
        </div>        
    );
}

export default LandingPageMain;
