import React from 'react';
import { Container } from 'react-bootstrap';
import NavHeader from './NavHeader';

const Header = () => {
    return (
        <header className="bg-primary fixed-top d-flex">
            <Container className="d-inline-block">
                <NavHeader />
            </Container>
        </header>
    );
}
 
export default Header;