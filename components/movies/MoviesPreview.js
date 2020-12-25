import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CarouselImages from '../ui/CarouselImages';
import actions from '../../actions/listActions';
import apiTmdb from '../../tmdb/apiTmdb';
import { extractInfoMovie } from '../../tmdb/extractInfo';

const MoviesPreview = ({ num }) => {
    // Redux
    const dispatch = useDispatch();
    const list = useSelector(state => state.movies.previewList);
    const language = useSelector(state => state.language.language);
    const loading = useSelector(state => state.movies.loading);

    // Actions
    const { previewList } = actions('movies');

    // Get movies
    const previewMovies = async () => {
        const movies = await apiTmdb(`/movie/popular`, { language });
        return movies.results.map(movie => extractInfoMovie(movie));
    };

    useEffect(() => {
        if(!list) {
            dispatch(previewList(previewMovies));
        }
    }, [language]);

    return (
        <>
            {!list || loading ?
                <div className="text-center">
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                </div>
            :
                <CarouselImages items={list.slice(0, num)} />
            }
        </>
    );
};

MoviesPreview.propTypes = {
    num: PropTypes.number
};

export default MoviesPreview;