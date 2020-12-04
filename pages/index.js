import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import MoviesPreview from '../components/movies/MoviesPreview';
import styled from 'styled-components';

const ResponsiveContainer = styled.div`
    width: 100%;
    @media (min-width: 768px) {
        width: 600px;
    }
`;

const Index = () => {
    return (
        <Layout>
            <div className="d-flex flex-column align-items-center">
                <Link href="/movies">
                    <a className="w-100">
                        <h1 className="text-center">Movies</h1>
                    </a>
                </Link>
                <ResponsiveContainer className="my-3">
                    <MoviesPreview numfilms={20} />
                </ResponsiveContainer>
            </div>
            
        </Layout>
    );
}

export default Index;