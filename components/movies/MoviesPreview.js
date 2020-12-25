import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { previewMovies } from '../../actions/moviesActions';
import CarouselImages from '../ui/CarouselImages';
import PropTypes from 'prop-types';

const MoviesPreview = ({ num }) => {
    // Redux
    const dispatch = useDispatch();
    const previewList = useSelector(state => state.movies.previewList);
    const language = useSelector(state => state.language.language);
    const loading = useSelector(state => state.movies.loading);

    // Get movies
    useEffect(() => {
        if(previewList.length === 0) {
            dispatch(previewMovies('popular', language));
        }
    }, [language]);

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
                <CarouselImages items={previewList.slice(0, num)} />
            }
        </>
    );
};

MoviesPreview.propTypes = {
    num: PropTypes.number
};

export default MoviesPreview;