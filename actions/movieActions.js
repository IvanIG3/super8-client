import apiTmdb from '../tmdb/apiTmdb';
import { toast } from 'react-toastify';
import {
    MOVIE_START_FETCHING_INFO,
    MOVIE_START_FETCHING_CAST,
    MOVIE_START_FETCHING_RECOMMENDATIONS,
    MOVIE_END_FETCHING_INFO,
    MOVIE_END_FETCHING_CAST,
    MOVIE_END_FETCHING_RECOMMENDATIONS,
    MOVIE_ERROR_FETCHING_INFO,
    MOVIE_ERROR_FETCHING_CAST,
    MOVIE_ERROR_FETCHING_RECOMMENDATIONS,
    MOVIE_CLEAR_STATE,
} from '../types';

export function getMovie(id, language) {
    return async dispatch => {
        dispatch({ type: MOVIE_START_FETCHING_INFO });
        try {
            const movie = await apiTmdb(`/movie/${id}`, { language });
            dispatch({
                type: MOVIE_END_FETCHING_INFO,
                payload: movie
            });
        } catch (error) {
            dispatch({
                type: MOVIE_ERROR_FETCHING_INFO,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function getMovieCast(id, language) {
    return async dispatch => {
        dispatch({ type: MOVIE_START_FETCHING_CAST });
        try {
            const result = await apiTmdb(`/movie/${id}/credits`, { language });
            dispatch({
                type: MOVIE_END_FETCHING_CAST,
                payload: result.cast
            });
        } catch (error) {
            dispatch({
                type: MOVIE_ERROR_FETCHING_CAST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function getMovieRecommendations(id, language) {
    return async dispatch => {
        dispatch({ type: MOVIE_START_FETCHING_RECOMMENDATIONS });
        try {
            const result = await apiTmdb(`/movie/${id}/recommendations`, { language });
            dispatch({
                type: MOVIE_END_FETCHING_RECOMMENDATIONS,
                payload: result.results
            });
        } catch (error) {
            dispatch({
                type: MOVIE_ERROR_FETCHING_RECOMMENDATIONS,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function clearState() {
    return dispatch => dispatch({ type: MOVIE_CLEAR_STATE });
};
