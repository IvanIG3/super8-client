import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const ContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-top: 100px;
`;

const Layout = ({children}) => {
    return (
        <ContainerLayout>
            <Header />
            <Container className="flex-1">
                <main>
                    { children }
                </main>
            </Container>
            <Footer />
        </ContainerLayout>
    );
}
 
export default Layout;