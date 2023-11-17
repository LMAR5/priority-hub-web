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
                                <i className="bi bi-person-circle fs-4"></i>                                
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
                                <Nav.Link href='/Summary'>Summary</Nav.Link>
                                <Nav.Link href='/Dashboard'>Dashboard</Nav.Link>
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