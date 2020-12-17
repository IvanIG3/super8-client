import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useUpdate from '../hooks/useUpdate';

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
    const movies = useSelector(state => state.movies.moviesList);

    // Get movies
    const getMovies = () => {
        if(query) {
            dispatch(searchMovies(query, language, page));
        } else if(sortBy) {
            dispatch(discoverMovies(sortBy, language, page))
        }
    };

    useEffect(() => {
        if (movies.length === 0) {
            getMovies();
        }
    }, [query, page, sortBy]);

    useUpdate(() => getMovies(), [language]);

    return (
        <Layout>
            <h1 className="text-center">{t('Movies')} - {t(sortBy)}</h1>
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