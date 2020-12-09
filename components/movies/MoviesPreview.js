import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { discoverMovies } from '../../actions/moviesActions';
import CarouselImages from '../ui/CarouselImages';
import PropTypes from 'prop-types';

const MoviesPreview = ({ num }) => {
    // Redux
    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movies.moviesList);
    const language = useSelector(state => state.language.language);

    // Get movies
    useEffect(() => {
        dispatch(discoverMovies({ language }));
    }, [language]);

    // Carousel items
    const carouselItems = moviesList.slice(0, num).map(movie => ({
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        overview: `${movie.overview.substring(0, 150)}...`
    }));

    return (
        <CarouselImages items={carouselItems} />
    );
};

MoviesPreview.propTypes = {
    num: PropTypes.number
};

export default MoviesPreview;