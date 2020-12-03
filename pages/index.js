import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import MoviesPreview from '../components/movies/MoviesPreview';

const Index = () => {
    return (
        <Layout>
            <div className="d-flex flex-column align-items-center">
                <Link href="/movies">
                    <a><h1 className="text-center">Movies</h1></a>
                </Link>
                <MoviesPreview numfilms={20} />
            </div>
            
        </Layout>
    );
}

export default Index;