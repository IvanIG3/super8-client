import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

    // Redux
    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movies.moviesList);
    const sort_by = useSelector(state => state.movies.sortBy);
    const page = useSelector(state => state.movies.page);
    const language = useSelector(state => state.movies.language);
    const query = useSelector(state => state.movies.query);
    const totalPages = useSelector(state => state.movies.totalPages);

    // Get movies
    useEffect(() => {
        if(startsearch) {
            if(sort_by) {
                dispatch(discoverMovies({sort_by, page, language}))
            } else if(query) {
                dispatch(searchMovies({query, page, language}));
            }
            setStartSearch(false);
        }
    }, [startsearch]);

    // Sorting movie buttons
    const sortButtons = [
        { name: 'Popularity', value: 'popularity.desc'},
        { name: 'Votes', value: 'vote_count.desc'},
        { name: 'Release', value: 'primary_release_date.desc'},
    ];

    // Functions
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

    return (
        <Layout>
            <h1 className="text-center">Movies</h1>
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
                <MoviesList
                    list={moviesList}
                />
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