import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { discoverMovies } from '../../actions/moviesActions';
import CarouselImages from '../ui/CarouselImages';

const MoviesPreview = ({ numfilms }) => {

    // Redux
    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movies.moviesList);
    const language = useSelector(state => state.movies.language);

    // Get movies
    useEffect(() => {
        dispatch(discoverMovies({
            sort_by: 'popularity.desc',
            page: 1,
            language
        }));
    }, []);

    // Carousel items
    const carouselItems = moviesList.slice(0, numfilms).map(movie => ({
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        overview: `${movie.overview.substring(0, 150)}...`
    }));

    return (
        <CarouselImages items={carouselItems} />
    );
}

export default MoviesPreview;