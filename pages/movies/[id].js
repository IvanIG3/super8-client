import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Layout from '../../components/layout/Layout';
import MovieDetails from '../../components/movies/MovieDetails';
import MovieCast from '../../components/movies/MovieCast';
import MovieRecommendations from '../../components/movies/MovieRecommendations';

import {
    getMovie,
    getMovieCast,
    clearState,
    getMovieRecommendations
} from '../../actions/movieActions';
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
            dispatch(getMovieCast(router.query.id, language));
            dispatch(getMovieRecommendations(router.query.id, language));
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
                <Tabs defaultActiveKey="details" className="mt-4 text-center">
                    <Tab
                        tabClassName="xs-block"
                        eventKey="details"
                        title={t('Details')}
                    >
                        <MovieDetails />
                    </Tab>
                    <Tab
                        tabClassName="xs-block"
                        eventKey="cast"
                        title={t('Cast')}
                    >
                        <MovieCast />
                    </Tab>
                    <Tab
                        tabClassName="xs-block"
                        eventKey="recommendations"
                        title={t('Recommendations')}
                    >
                        <MovieRecommendations />
                    </Tab>
                </Tabs>
            }
        </Layout>
    );
}

export default Movie;