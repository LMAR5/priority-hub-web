import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavBar() {
    return (
        <header>
            <Navbar expand="lg" bg='dark' data-bs-theme='dark'>
                <Container>
                    <Navbar.Brand href='/'>Prototype</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id='navbar-collapse'>
                        <Nav className='me-auto'>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/Tasks'>Tasks</Nav.Link>
                            <Nav.Link href='/Categories'>Categories</Nav.Link>
                            <Nav.Link href='/About'>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default CustomNavBar;