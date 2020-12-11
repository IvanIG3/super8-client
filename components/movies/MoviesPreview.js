import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { discoverMovies } from '../../actions/moviesActions';
import CarouselImages from '../ui/CarouselImages';
import PropTypes from 'prop-types';

const MoviesPreview = ({ num }) => {
    // Redux
    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movies.moviesList);
    const language = useSelector(state => state.language.language);
    const loading = useSelector(state => state.movies.loading);

    // Get movies
    useEffect(() => {
        dispatch(discoverMovies('popular', language, '1'));
    }, [language]);

    // Carousel items
    const carouselItems = moviesList.slice(0, num).map(movie => ({
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        overview: `${movie.overview.substring(0, 150)}...`
    }));

    return (
        <>
            {loading ?
                <div className="text-center">
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                </div>
            :
                <CarouselImages items={carouselItems} />
            }
        </>
    );
};

MoviesPreview.propTypes = {
    num: PropTypes.number
};

export default MoviesPreview;