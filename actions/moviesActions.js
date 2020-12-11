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
} from '../types';


export function discoverMovies(endpoint, language, page) {
    return async dispatch => {
        dispatch({ type: MOVIES_START_DISCOVERING_LIST });
        try {
            const data = {
                api_key: process.env.tmdbApi,
                language,
                page
            };
            const params = new URLSearchParams(data).toString();
            const movies = await tmdb.get(`/movie/${endpoint}?${params}`);
            dispatch({
                type: MOVIES_END_DISCOVERING_LIST,
                payload: {
                    moviesList: movies.data.results,
                    totalPages: movies.data.total_pages,
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

export function searchMovies(query, language, page) {
    return async dispatch => {
        dispatch({ type: MOVIES_START_SEARCHING_LIST });
        try {
            const data = {
                api_key: process.env.tmdbApi,
                query,
                language,
                page
            };
            const params = new URLSearchParams(data).toString();
            const movies = await tmdb.get(`/search/movie?${params}`);
            dispatch({
                type: MOVIES_END_SEARCHING_LIST,
                payload: {
                    moviesList: movies.data.results,
                    totalPages: movies.data.total_pages,
                }
            });
        } catch (error) {
            dispatch({
                type: MOVIES_ERROR_SEARCHING_LIST,
                payload: error.response.data.msg
            });
        }
    };
};

export function setSortBy(sortBy) {
    return dispatch => {
        dispatch({
            type: MOVIES_SET_SORT_BY,
            payload: sortBy
        });
    };
};

export function setQuery(query) {
    return dispatch => {
        dispatch({
            type: MOVIES_SET_QUERY,
            payload: query
        });
    };
};

export function setPage(page) {
    return dispatch => {
        dispatch({
            type: MOVIES_SET_PAGE,
            payload: page
        });
    };
};

