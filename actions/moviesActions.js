import tmdb from '../config/axiosTmdb';

import {
    MOVIES_START_DISCOVERING_LIST,
    MOVIES_END_DISCOVERING_LIST,
    MOVIES_ERROR_DISCOVERING_LIST,
    MOVIES_START_SEARCHING_LIST,
    MOVIES_END_SEARCHING_LIST,
    MOVIES_ERROR_SEARCHING_LIST,
    MOVIES_SET_SORT_BY,
    MOVIES_SET_PAGE,
    MOVIES_SET_QUERY,
    MOVIES_SET_LANGUAGE,
} from '../types';


export function discoverMovies(data) {
    return async dispatch => {
        dispatch({ type: MOVIES_START_DISCOVERING_LIST });
        try {
            const params = new URLSearchParams(data).toString();
            const movies = await tmdb.get(
                `/discover/movie?api_key=${process.env.tmdbApi}&${params}`);
            dispatch({
                type: MOVIES_END_DISCOVERING_LIST,
                payload: {
                    moviesList: movies.data.results,
                    totalPages: movies.data.total_pages,
                    totalResults: movies.data.total_results
                }
            });
        } catch (error) {
            dispatch({
                type: MOVIES_ERROR_DISCOVERING_LIST,
                payload: error.response.data.msg
            });
        }
    };
};


export function searchMovies() {
    return async dispatch => {



    };
};