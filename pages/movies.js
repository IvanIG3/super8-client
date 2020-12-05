import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import Layout from '../components/layout/Layout';
import MoviesList from '../components/movies/MoviesList';
import SortButtons from '../components/ui/SortButtons';
import SearchForm from '../components/ui/SearchForm';
import Paginator from '../components/ui/Paginator';

// Redux actions
import {
    discoverMovies,
    searchMovies,
    setSortBy,
    setQuery,
    setPage
} from '../actions/moviesActions';


const Movies = () => {
    // State
    const [ startsearch, setStartSearch ] = useState(true);

    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Movies Redux
    const moviesList = useSelector(state => state.movies.moviesList);
    const sort_by = useSelector(state => state.movies.sortBy);
    const page = useSelector(state => state.movies.page);
    const query = useSelector(state => state.movies.query);
    const totalPages = useSelector(state => state.movies.totalPages);
    const loading = useSelector(state => state.movies.loading);

    // Language Redux
    const language = useSelector(state => state.language.language);

    // Get movies
    useEffect(() => {
        if(startsearch) {
            search();
        }
    }, [startsearch]);

    useEffect(() => search(), [language]);

    // Functions
    function search() {
        if(sort_by) {
            dispatch(discoverMovies({sort_by, page, language}))
        } else if(query) {
            dispatch(searchMovies({query, page, language}));
        }
        setStartSearch(false);
    }

    const setSortFn = sortby => {
        dispatch(setSortBy(sortby));
        setStartSearch(true);
    };

    const setQueryFn = query => {
        dispatch(setQuery(query));
        setStartSearch(true);
    };

    const setPageFn = page => {
        dispatch(setPage(page));
        setStartSearch(true);
    };

    // Sorting movie buttons
    const sortButtons = [
        { name: t('Popular'), value: 'popularity.desc'},
        { name: t('Most voted'), value: 'vote_count.desc'},
        { name: t('Soon'), value: 'primary_release_date.desc'},
    ];

    return (
        <Layout>
            <h1 className="text-center">{t('Movies')}</h1>
            <div className="d-flex flex-column align-items-center">
                <div className="my-3">
                    <SortButtons
                        buttonsData={sortButtons}
                        sortby={sort_by}
                        sortFn={setSortFn}
                    />
                </div>
                <div className="my-3">
                    <SearchForm
                        onSubmit={setQueryFn}
                    />
                </div>
                {loading ?
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                :
                    <MoviesList
                        list={moviesList}
                    />
                }
                <Paginator
                    actualPage={page}
                    totalPages={totalPages}
                    onClick={setPageFn}
                />
            </div>
        </Layout>
    );
}

export default Movies;