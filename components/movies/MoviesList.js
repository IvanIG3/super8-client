import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { discoverMovies, setSortBy } from '../../actions/moviesActions';
import MovieCard from '../ui/MovieCard';
import SortButtons from '../ui/SortButtons';
import SearchForm from '../ui/SearchForm';

const MoviesList = () => {
    
    // Redux
    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movies.moviesList);
    const sort_by = useSelector(state => state.movies.sortBy);
    const page = useSelector(state => state.movies.page);
    const language = useSelector(state => state.movies.language);

    // Get movies
    useEffect(() => 
        dispatch(discoverMovies({sort_by, page, language})),
        [sort_by, page, language]
    );

    // Sorting movie buttons
    const sortButtons = [
        { name: 'Popularity', value: 'popularity.desc'},
        { name: 'Votes', value: 'vote_count.desc'},
        { name: 'Release', value: 'primary_release_date.desc'},
    ];

    // Functions
    const sortFn = sortby => dispatch(setSortBy(sortby));

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="py-3">
                <SortButtons
                    buttonsData={sortButtons}
                    sortby={sort_by}
                    sortFn={sortFn}
                />
            </div>
            <div className="py-3">
                <SearchForm />
            </div>
            <Row noGutters className="my-5 justify-content-center">
                {moviesList.map(m => (
                    <Col key={m.id} className="mb-5 col-auto">
                        <MovieCard
                            title={m.title}
                            vote={m.vote_average * 10}
                            posterPath={m.poster_path ?
                                `https://image.tmdb.org/t/p/w200${m.poster_path}` :
                                'no-poster.png'
                            }
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
 
export default MoviesList;