import React from 'react';
import { Container } from 'react-bootstrap';
import NavHeader from './NavHeader';

const Header = () => (
    <header className="fixed-top d-flex" style={{ minHeight: "80px"}}>
        <div className="blurrer"></div>
        <Container className="d-inline-block">
            <NavHeader />
        </Container>
    </header>
);
 
export default Header;