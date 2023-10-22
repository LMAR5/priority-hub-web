import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthenticationService from '../../services/AuthenticationService';

function SignInCustom() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const HandleSubmit = (e) => {
        e.preventDefault();
        const returnUserData = { email, password };

        AuthenticationService.signIn(returnUserData);

    }

    return (
        <>
            <div className='d-flex justify-content-center'>
                <Form className='signin rounded' onSubmit={HandleSubmit}>
                    <h2 className='mb-3'>Sign In</h2>

                    <Form.Group className='mb-3' controlId='formBasicEmail' >
                        <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formPassword' >
                        <Form.Control type='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formCheckbox'>
                        <Form.Check type='checkbox' label='Remember Me' />
                    </Form.Group>

                    <Container fluid>
                        <Row>
                            <Col>
                                <Button variant="primary" type='submit'>Sign In</Button>{' '}
                            </Col>
                            <Col>
                                <Button href="/SignUp">Sign Up</Button>{' '}
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        </>
    );
}


export default SignInCustom;
