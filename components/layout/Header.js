import React from 'react';
import { Container } from 'react-bootstrap';
import NavHeader from './NavHeader';

const Header = () => {
    return (
        <header className="fixed-top d-flex">
            <div className="blurrer"></div>
            <Container className="d-inline-block">
                <NavHeader />
            </Container>
        </header>
    );
}
 
export default Header;