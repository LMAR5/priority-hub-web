import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LandingPageFooter(){
    return(
        <footer className="fixed-bottom">
            <Container>
                <Row>
                    <Col sm={4}>
                        <p><b>Environment:</b> {process.env.REACT_APP_TITLE}</p>
                    </Col>
                    <Col sm={4} className='text-center'>
                        <p><b>Copyright © 2023</b></p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default LandingPageFooter;
