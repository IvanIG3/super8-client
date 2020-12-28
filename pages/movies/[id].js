import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Layout from '../../components/layout/Layout';
import MovieDetails from '../../components/movies/MovieDetails';

import { getMovie, clearState } from '../../actions/movieActions';
import { firebaseContext } from '../../firebase';

const Movie = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Redux
    const language = useSelector(state => state.language.language);
    const movie = useSelector(state => state.movie.movie);
    const loading = useSelector(state => state.movie.loading);

    // Firestore
    const { user } = useContext(firebaseContext);

    // Get movie
    useEffect(() => {
        if (router.query.id) {
            dispatch(getMovie(router.query.id, language));
        }
        return () => dispatch(clearState());
    }, [router, language]);

    return (
        <Layout>
            <h1 className="text-center w-100">{movie && movie.title}</h1>
            {loading &&
                <div className="text-center">
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                </div>
            }
            {!loading && movie &&
                <Tabs defaultActiveKey="details" className="mt-4">
                    <Tab
                        tabClassName="xs-block"
                        eventKey="details"
                        title={t('Details')}
                    >
                        <MovieDetails />
                    </Tab>
                </Tabs>
            }
        </Layout>
    );
}

export default Movie;