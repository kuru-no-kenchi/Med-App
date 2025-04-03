import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoimg from '../assets/logo.png';
import './Navbar.css'; 

function CustomNavbar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar expand="lg" bg="light" variant="light" expanded={expanded} className="shadow-sm">
            <Container>
                {/* Logo */}
                <Navbar.Brand className="d-flex align-items-center justify-space-between" as={Link} to="/" onClick={() => setExpanded(false)}>
                    <img src={logoimg} alt="E-health Logo" width="50" />
                    <h1>E-Health</h1>
                </Navbar.Brand>

                {/* Mobile Toggle Button */}
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav" 
                    onClick={() => setExpanded(expanded ? false : true)} 
                />

                {/* Nav Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/About" onClick={() => setExpanded(false)}>About Us</Nav.Link>
                        <Nav.Link as={Link} to="/AllDoctors" onClick={() => setExpanded(false)}>All Doctors</Nav.Link>
                        <Nav.Link as={Link} to="/Contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
                    </Nav>
                    {/* Create Account Button */}
                    <Button 
                        as={Link} 
                        to="/Register" 
                        variant="primary" 
                        className="rounded-pill ms-3"
                        onClick={() => setExpanded(false)}
                    >
                        Create Account
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
