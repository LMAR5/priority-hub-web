import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SignUpCustom() {
    return (
        <>
            <h1>Sign Up custom</h1>

            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className='mb-3' controlId='formUsername' />
                            <Form.Control type='user' placeholder='Enter username' />

                            <Form.Group classname='mb-3' controlId='formBasicEmail' />
                            <Form.Control type='email' placeholder='Enter email' />


                            <Form.Group classname='mb-3' controlId='formPassword' />
                            <Form.Control type='password' placeholder='Enter password' />

                            <Form.Group classname='mb-3' controlId='formConfirmPassword' />
                            <Form.Control type='password' placeholder='Confirm password' />

                            <Button variant="primary">Sign Up</Button>{' '}
                        </Form>
                    </Col>
                </Row>




            </Container>

        </>
    );
}

export default SignUpCustom;
