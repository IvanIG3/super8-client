import React from 'react';
import Layout from '../components/layout/Layout';
import MoviesList from '../components/movies/MoviesList';

const Movies = () => {
    return (
        <Layout>
            <h1 className="text-center">Movies</h1>
            <MoviesList />
        </Layout>
    );
}

export default Movies;