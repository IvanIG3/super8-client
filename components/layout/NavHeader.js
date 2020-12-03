import React from 'react';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from './Logo';
import NavLink from './NavLink';

const NavHeader = () => {
    return (
        <Navbar collapseOnSelect expand="md">
            <Link href="/">
                <Navbar.Brand href="/">
                    <Logo />
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="justify-content-end flex-1">
                    <NavLink href="/movies">Movies</NavLink>
                    <NavLink href="/tvshows">TV Shows</NavLink>
                    <NavLink href="/mylists">My Lists</NavLink>
                    <NavLink href="/mytube">MyTube</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavHeader;