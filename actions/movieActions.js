import apiTmdb from '../tmdb/apiTmdb';
import {
    MOVIE_START_FETCHING_INFO,
    MOVIE_END_FETCHING_INFO,
    MOVIE_ERROR_FETCHING_INFO
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
        }
    };
};