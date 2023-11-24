import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function LandingPageHeader(){
    return(
        <header>
            <Navbar expand="lg" bg='primary' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand href='/'>Priority Hub</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id='navbar-collapse'>
                        <Nav className='me-auto justify-content-end flex-grow-1'>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/About'>About Us</Nav.Link>
                            <Nav.Link href='/SignIn'>Sign In</Nav.Link>
                            <Nav.Link href='/SignUp'>Sign Up</Nav.Link>
                            <Nav.Link href='/Main'>Main</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default LandingPageHeader;
