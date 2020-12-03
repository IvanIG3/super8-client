import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

// Components
import Layout from '../components/layout/Layout';
import MoviesList from '../components/movies/MoviesList';
import SortButtons from '../components/ui/SortButtons';
import SearchForm from '../components/ui/SearchForm';

// Redux
import { discoverMovies, searchMovies, setSortBy, setQuery } from '../actions/moviesActions';

const Movies = () => {

    // Redux
    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movies.moviesList);
    const sort_by = useSelector(state => state.movies.sortBy);
    const page = useSelector(state => state.movies.page);
    const language = useSelector(state => state.movies.language);
    const query = useSelector(state => state.movies.query);

    // Get movies
    useEffect(() => {
        if(sort_by) {
            dispatch(discoverMovies({sort_by, page, language}))
        } else if(query) {
            dispatch(searchMovies({query, page, language}));
        }
    }, [sort_by, query, page, language]);

    // Sorting movie buttons
    const sortButtons = [
        { name: 'Popularity', value: 'popularity.desc'},
        { name: 'Votes', value: 'vote_count.desc'},
        { name: 'Release', value: 'primary_release_date.desc'},
    ];

    // Functions
    const setSortFn = sortby => dispatch(setSortBy(sortby));
    const setQueryFn = query => dispatch(setQuery(query));

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
        </div>
        </Layout>
    );
}

export default Movies;