import tmdb from '../config/axiosTmdb';
import {
    MOVIE_START_FETCHING_INFO,
    MOVIE_END_FETCHING_INFO,
    MOVIE_ERROR_FETCHING_INFO
} from '../types';

export function getMovie(id, language) {
    return async dispatch => {
        dispatch({ type: MOVIE_START_FETCHING_INFO });
        try {
            const data = {
                api_key: process.env.tmdbApi,
                language
            };
            const params = new URLSearchParams(data).toString();
            const movie = await tmdb.get(`/movie/${id}?${params}`);
            dispatch({
                type: MOVIE_END_FETCHING_INFO,
                payload: movie.data
            });
        } catch (error) {
            dispatch({
                type: MOVIE_ERROR_FETCHING_INFO,
                payload: error.response.data.msg
            });
        }
    };
};