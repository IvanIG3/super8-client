import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';

import Header from './Header';
import Footer from './Footer';
import UserNav from './UserNav';

const Layout = ({ children, description }) => {

    // Lazy load
    const DynamicToastContainer = dynamic(() =>
        import('react-toastify').then(imp => imp.ToastContainer));

    return (
        <>
            <Head>
                <meta name="description" content={description} key="description" />
            </Head>
            <div
                className="d-flex flex-column"
                style={{ paddingTop: "100px", height: "100vh" }}
            >
                <Header />
                <DynamicToastContainer />
                <Container className="flex-1">
                    <UserNav />
                    <main>
                        {children}
                    </main>
                </Container>
                <Footer />
            </div>
        </>
    );
};

export default Layout;