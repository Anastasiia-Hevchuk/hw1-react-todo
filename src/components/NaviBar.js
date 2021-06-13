import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { Nav, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Styles= styled.div `
    a, .navbar-brand, .navbar-nav, .navbar-link {
        color: #adb1b8;
        &: hover {
            color: white
        }
    }

`

export const NaviBar = () => {
    return (
        <>
        <Styles>
            <NavBar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <NavBar.Toggle aria-controls="responsive-navbar-nav" />
                    <NavBar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link><Link to="/">Home</Link></Nav.Link>
                            <Nav.Link><Link to="/todos">Todos</Link></Nav.Link>
                            <Nav.Link><Link to="/users">Users</Link></Nav.Link>
                        </Nav>
                    </NavBar.Collapse>
                </Container>
            </NavBar>
            </Styles>
        </>
            
    );
}

