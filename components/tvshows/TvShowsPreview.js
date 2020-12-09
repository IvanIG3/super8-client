import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { discoverTvShows } from '../../actions/tvShowsActions';
import CarouselImages from '../ui/CarouselImages';
import PropTypes from 'prop-types';

const TvShowsPreview = ({ num }) => {
    // Redux
    const dispatch = useDispatch();
    const tvShowsList = useSelector(state => state.tvShows.tvShowsList);
    const language = useSelector(state => state.language.language);

    // Get default tv shows
    useEffect(() => {
        dispatch(discoverTvShows({ language }));
    }, [language]);

    // Carousel items
    const carouselItems = tvShowsList.slice(0, num).map(tvShow => ({
        title: tvShow.name,
        image: `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`,
        overview: `${tvShow.overview.substring(0, 150)}...`
    }));

    return (
        <CarouselImages items={carouselItems} />
    );
};

TvShowsPreview.propTypes = {
    num: PropTypes.number
};

export default TvShowsPreview;