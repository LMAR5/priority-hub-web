import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../assets/css/SignUp.css'

function SignUpCustom() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const HandleSubmit = (e) => {
        e.preventDefault();
        const user = { username, email, password, };

        fetch('http://localhost:3001/api/AuthController/SignUp', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(() => {

        })
    }

    return (
        <>
            <div className='d-flex justify-content-center'>
                <Form className='signup rounded' onSubmit={HandleSubmit}>
                    <h2 className='mb-3'>Sign Up</h2>
                    <Form.Group className='mb-3' controlId='formName'>
                        <Form.Control type='' placeholder='Enter name' onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBasicEmail' >
                        <Form.Control type='email' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formPassword' >
                        <Form.Control type='password' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
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


