import React from 'react';
import Layout from '../components/layout/Layout';
import MoviesList from '../components/movies/MoviesList';

const Index = () => {
    return (
        <Layout>
            <h1>Index</h1>
            <MoviesList />
        </Layout>
    );
}

export default Index;