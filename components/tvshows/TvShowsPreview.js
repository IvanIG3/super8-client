import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { previewTvShows } from '../../actions/tvShowsActions';
import CarouselImages from '../ui/CarouselImages';
import PropTypes from 'prop-types';

const TvShowsPreview = ({ num }) => {
    // Redux
    const dispatch = useDispatch();
    const previewList = useSelector(state => state.tvShows.previewList);
    const language = useSelector(state => state.language.language);
    const loading = useSelector(state => state.tvShows.loading);

    // Get default tv shows
    useEffect(() => {
        if(previewList.length === 0) {
            dispatch(previewTvShows('popular', language));
        }
    }, [language]);

    // Carousel items
    const carouselItems = previewList.slice(0, num).map(tvShow => ({
        title: tvShow.name,
        image: `${process.env.tmdbImageURL}${tvShow.backdrop_path}`,
        overview: `${tvShow.overview.substring(0, 150)}...`,
        url: `/tvshows/${tvShow.id}`
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

TvShowsPreview.propTypes = {
    num: PropTypes.number
};

export default TvShowsPreview;