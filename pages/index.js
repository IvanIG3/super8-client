import React from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import MoviesPreview from '../components/movies/MoviesPreview';
import TvShowsPreview from '../components/tvshows/TvShowsPreview';
import MyListPreview from '../components/mylist/MyListPreview';

const Index = () => {

    // Translation
    const { t } = useTranslation();

    return (
        <Layout>
            <div className="mb-5">
                <Row className="justify-content-center my-3">
                    <Col xs={12} md={10} lg={8} xl={8}>
                        <Link href="/movies">
                            <a><h1 className="w-100 text-center">{t('Movies')}</h1></a>
                        </Link>
                        <MoviesPreview numfilms={20} />
                    </Col>
                </Row>
                <Row className="justify-content-center my-3">
                    <Col xs={12} md={10} lg={8} xl={8}>
                        <Link href="/tvshows">
                            <a><h1 className="w-100 text-center">{t('TV Shows')}</h1></a>
                        </Link>
                        <TvShowsPreview numfilms={20} />
                    </Col>
                </Row>
                <Row className="justify-content-center my-3">
                    <Col xs={12} md={10} lg={8} xl={8}>
                        <Link href="/mylist">
                            <a><h1 className="w-100 text-center">{t('My List')}</h1></a>
                        </Link>
                        <MyListPreview />
                    </Col>
                </Row>
            </div>
        </Layout>
    );
}

export default Index;