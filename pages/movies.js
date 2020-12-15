import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import Layout from '../components/layout/Layout';
import MoviesList from '../components/movies/MoviesList';
import MoviesSortButtons from '../components/movies/MoviesSortButtons';
import MoviesSearchForm from '../components/movies/MoviesSearchForm';
import MoviesPaginator from '../components/movies/MoviesPaginator';

// Redux actions
import { discoverMovies, searchMovies } from '../actions/moviesActions';


const Movies = () => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Redux
    const sortBy = useSelector(state => state.movies.sortBy);
    const page = useSelector(state => state.movies.page);
    const query = useSelector(state => state.movies.query);
    const loading = useSelector(state => state.movies.loading);
    const language = useSelector(state => state.language.language);

    // Get movies
    useEffect(() => {
        if(query) {
            dispatch(searchMovies(query, language, page));
        } else {
            dispatch(discoverMovies(sortBy, language, page))
        }
    }, [language, query, page, sortBy]);

    return (
        <Layout>
            <h1 className="text-center">{t('Movies')}</h1>
            <div className="d-flex flex-column align-items-center">
                <div className="my-3">
                    <MoviesSortButtons />
                </div>
                <div className="my-3">
                    <MoviesSearchForm />
                </div>
                {loading ?
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                :
                    <MoviesList />
                }
                <MoviesPaginator />
            </div>
        </Layout>
    );
}

export default Movies;