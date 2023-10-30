import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import AuthenticationService from '../../services/AuthenticationService';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import CustomFooter from '../Layout/CustomFooter';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function SignInCustom({ setToken }) {

    // mode: SIGNIN, SIGNUP, RESET
    const [mode, setMode] = useState('SIGNIN');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const MySwal = withReactContent(Swal);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const returnUser = { email, password };
        if (isEmpty(email) || isEmpty(password)) {
            const Toast = MySwal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', MySwal.stopTimer)
                    toast.addEventListener('mouseleave', MySwal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'warning',
                title: 'Provide email and password'
            })
        } else {
            await AuthenticationService.signIn(returnUser).then((res) => {
                setToken(res);
                if (!res.success) {
                    const Toast = MySwal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', MySwal.stopTimer)
                            toast.addEventListener('mouseleave', MySwal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'warning',
                        title: `${res.message}`
                    })
                } else {
                    const Toast = MySwal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', MySwal.stopTimer)
                            toast.addEventListener('mouseleave', MySwal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: `${res.message}`
                    })
                }
            });
        }
    }

    const HandleSignUp = (e) => {
        e.preventDefault();
        const newUser = { firstname, lastname, email, password };
        if (isEmpty(firstname) || isEmpty(lastname) || isEmpty(email) || isEmpty(password)) {
            const Toast = MySwal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', MySwal.stopTimer)
                    toast.addEventListener('mouseleave', MySwal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'warning',
                title: 'Complete all fields'
            })
        } else {
            AuthenticationService.signUp(newUser).then((data) => {
                if (data.result) {
                    setEmail('');
                    setPassword('');
                    setMode('SIGNIN');
                    const Toast = MySwal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', MySwal.stopTimer)
                            toast.addEventListener('mouseleave', MySwal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed up successfully'
                    })
                } else {
                    const Toast = MySwal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', MySwal.stopTimer)
                            toast.addEventListener('mouseleave', MySwal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'warning',
                        title: `${data.message}`
                    })
                }
            });
        }
    }

    const HandleResetPassword = (e) => {
        e.preventDefault();
        const confirmPassw = { email, password, confirmPassword };
        if (isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
            const Toast = MySwal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', MySwal.stopTimer)
                    toast.addEventListener('mouseleave', MySwal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'warning',
                title: 'Complete all fields'
            })
        }
        else if (password !== confirmPassword) {
            //alert("Passwords don't match");
            const Toast = MySwal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', MySwal.stopTimer)
                    toast.addEventListener('mouseleave', MySwal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'warning',
                title: "Passwords don't match"
            })
        } else {
            AuthenticationService.resetPassword(confirmPassw).then((data) => {
                if (data.result) {
                    setEmail('');
                    setPassword('');
                    setMode('SIGNIN');
                    const Toast = MySwal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', MySwal.stopTimer)
                            toast.addEventListener('mouseleave', MySwal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: 'Password reset successful'
                    })
                } else {
                    const Toast = MySwal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', MySwal.stopTimer)
                            toast.addEventListener('mouseleave', MySwal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'success',
                        title: `${data.message}`
                    })
                }
            });
        }
    }

    const isEmpty = (str) => {
        return (!str || str.length === 0);
    }

    const switchView = (mode) => {
        switch (mode) {
            case 'SIGNIN':
                setMode('SIGNIN');
                setEmail('');
                setPassword('');
                break;
            case 'SIGNUP':
                setMode('SIGNUP');
                setFirstname('');
                setLastname('');
                setEmail('');
                setPassword('');
                break;
            default:
                setMode('RESET');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                break;
        }
    }

    const renderSignIn = () => {
        return (
            <Card className='signin mx-auto p-3 shadow rounded-4'>
                <Card.Body>
                    <Form className='rounded' onSubmit={HandleSubmit}>
                        <h2 className='mb-4'>Sign in to your account</h2>
                        <Form.Group className="mb-3" controlId="signinBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='signinPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button className='px-1' variant='link' onClick={() => { switchView('RESET') }}>Forgot password?</Button>
                        </Form.Group>
                        <Form.Group>
                            <Button className='w-100 mb-1' variant="primary" type='submit'>Sign In</Button>
                            <span>Don't have an account?</span>
                            <Button className='px-1' variant='link' onClick={() => { switchView('SIGNUP') }}>Sign Up</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    const renderSignUp = () => {
        return (
            <Card className='signin mt-5 m-auto p-3 shadow rounded-4'>
                <Card.Body>
                    <Form className='rounded' onSubmit={HandleSignUp}>
                        <h2 className='mb-4'>Create your account</h2>
                        <Form.Group className='mb-3' controlId='signupFirstname'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control type='text' placeholder='Enter your first name' value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='signupLastname'>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type='text' placeholder='Enter your last name' value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='signupPassword' >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Button className='w-100 mb-1' variant="primary" type='submit'>Sign Up</Button>
                            <span>Already have an account?</span>
                            <Button className='px-1' variant='link' onClick={() => { switchView('SIGNIN') }}>Sign In</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    const renderResetPassword = () => {
        return (
            <Card className='signin mt-5 m-auto p-3 shadow rounded-4'>
                <Card.Body>
                    <Form className='rounded' onSubmit={HandleResetPassword}>
                        <h2 className='mb-4'>Reset password</h2>
                        <Form.Group className="mb-3" controlId="signupBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='resetPassword' >
                            <Form.Label>New password</Form.Label>
                            <Form.Control type='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-3' controlId='resetConfirmPassword' >
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type='password' placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Button className='w-100 mb-1' variant="primary" type='submit'>Reset password</Button>
                            <span>Already have an account?</span>
                            <Button className='px-1' variant='link' onClick={() => { switchView('SIGNIN') }}>Sign In</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    const renderImageCard = () => {
        return (
            <div className='vh-100'>
                <div className='p-7rem text-wrap text-white h-100'>
                    <Image className='h-15' src={require("../../assets/images/react.png")} />
                    <h6 className='display-6 my-3'>Organize your work</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    <h6 className='display-6 mt-4 mb-3'>See how you did</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Navbar bg='light' className='shadow'>
                        <Container>
                            <Navbar.Brand><h3 className='text-dark my-0'>Priority Hub</h3></Navbar.Brand>
                        </Container>
                    </Navbar>
                </Row>
                <Row>
                    <Col sm={12} lg={6} className='justify-content-center align-self-center my-3'>
                        {mode === 'SIGNIN' ? renderSignIn() : <span></span>}
                        {mode === 'SIGNUP' ? renderSignUp() : <span></span>}
                        {mode === 'RESET' ? renderResetPassword() : <span></span>}
                    </Col>
                    <Col sm={12} lg={6} className='justify-content-center align-self-center px-0 img-signin'>
                        {renderImageCard()}
                    </Col>
                </Row>
                <CustomFooter />
            </Container>
        </div>
    );
}

SignInCustom.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default SignInCustom;
