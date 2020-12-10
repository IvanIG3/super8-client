import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import MoviesPreview from '../components/movies/MoviesPreview';
import TvShowsPreview from '../components/tvshows/TvShowsPreview';

const Index = () => {

    // Translation
    const { t } = useTranslation();

    return (
        <Layout>
            <Row className="justify-content-center mb-5">
                <Col xs={12} md={10} lg={8} xl={6} className="mt-3">
                    <Link href="/movies">
                        <a><h1 className="w-100 text-center">{t('Movies')}</h1></a>
                    </Link>
                    <MoviesPreview numfilms={20} />
                </Col>
                <Col xs={12} md={10} lg={8} xl={6} className="mt-3">
                    <Link href="/tvshows">
                        <a><h1 className="w-100 text-center">{t('TV Shows')}</h1></a>
                    </Link>
                    <TvShowsPreview numfilms={20} />
                </Col>
            </Row>
        </Layout>
    );
}

export default Index;