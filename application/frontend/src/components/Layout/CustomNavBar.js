import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import AuthenticationService from '../../services/AuthenticationService';

function CustomNavBar() {
    return (
        <header>
            <Navbar expand={false} bg='dark' variant='dark' data-bs-theme='dark' className='bg-body-tertiary mb-3'>
                <Container>
                    <Navbar.Toggle aria-controls='offcanvasNavbar-expand-false'></Navbar.Toggle>
                    <Navbar.Brand href='/'>Priority Hub</Navbar.Brand>
                    <Navbar.Text>
                        <Dropdown>
                            <Dropdown.Toggle className='bg-body-tertiary border-0' bg="dark" variant="dark" id="dropdown-basic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => { AuthenticationService.signOut() }} >Sign out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Text>
                    <Navbar.Offcanvas id='offcanvasNavbar-expand-false' placement='start'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel-expand-false'>
                                Priority Hub
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href='/'>Home</Nav.Link>
                                <Nav.Link href='/Tasks'>Tasks</Nav.Link>
                                <Nav.Link href='/Categories'>Categories</Nav.Link>
                                <Nav.Link href='/About'>About Us</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    );
};

export default CustomNavBar;