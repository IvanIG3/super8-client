import React from 'react';
import Link from 'next/link';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from './Logo';

import styled from 'styled-components';

const NavText = styled.p`
    margin: 0;
    font-family: 'Rammetto One';
`;

const Header = () => {
    return (
        <header className="bg-primary fixed-top d-flex">
            <Container className="d-inline-block">
                <Navbar collapseOnSelect expand="md">
                    <Link href="/">
                        <Navbar.Brand href="/">
                            <Logo />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Nav className="justify-content-end flex-1">
                            <Link href="/prueba">
                                <Nav.Link href="/prueba" className="mx-2">
                                    <NavText className="text-secondary">Películas</NavText>
                                </Nav.Link>
                            </Link>
                            <Link href="/prueba">
                                <Nav.Link href="/prueba" className="mx-2">
                                    <NavText className="text-secondary">Series</NavText>
                                </Nav.Link>
                            </Link>
                            <Link href="/prueba">
                                <Nav.Link href="/prueba" className="mx-2">
                                    <NavText className="text-secondary">Mis Listas</NavText>
                                </Nav.Link>
                            </Link>
                            <Link href="/prueba">
                                <Nav.Link href="/prueba" className="mx-2">
                                    <NavText className="text-secondary">Youtube</NavText>
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}
 
export default Header;