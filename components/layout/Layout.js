import React from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import Header from './Header';
import Footer from './Footer';
import UserNav from './UserNav';

const ContainerLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-top: 100px;
`;

const Layout = ({children, description}) => {
    return (
        <>
            <Head>
                <meta 
                    name="description"
                    content={description}
                />
                <html lang="es"/>
                <title>Super8</title>
            </Head>
            <ContainerLayout>
                <Header />
                <ToastContainer />
                <Container className="flex-1">
                    <UserNav />
                    <main>
                        { children }
                    </main>
                </Container>
                <Footer />
            </ContainerLayout>
        </>
    );
}
 
export default Layout;