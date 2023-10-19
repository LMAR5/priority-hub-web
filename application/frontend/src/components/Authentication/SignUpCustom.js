import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../assets/css/SignUp.css'

function SignUpCustom() {
    return (
        <>
            <div className='d-flex justify-content-center'>
                <Form className='signup rounded'>
                    <h2 className='mb-3'>Sign Up</h2>
                    <Form.Group className='mb-3' controlId='formName'>
                        <Form.Control type='user' placeholder='Enter name' />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicEmail' >
                        <Form.Control type='email' placeholder='Enter email' />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formPassword' >
                        <Form.Control type='password' placeholder='Enter password' />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formConfirmPassword' >
                        <Form.Control type='password' placeholder='Confirm password' />
                    </Form.Group>

                    <Button variant="primary" type='submit'>Sign Up</Button>{' '}
                </Form>
            </div>
        </>
    );
}

export default SignUpCustom;
