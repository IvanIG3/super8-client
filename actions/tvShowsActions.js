import tmdb from '../config/axiosTmdb';
import {
    TVSHOWS_START_DISCOVERING_LIST,
    TVSHOWS_END_DISCOVERING_LIST,
    TVSHOWS_ERROR_DISCOVERING_LIST,
    TVSHOWS_START_SEARCHING_LIST,
    TVSHOWS_END_SEARCHING_LIST,
    TVSHOWS_ERROR_SEARCHING_LIST,
    TVSHOWS_SET_SORT_BY,
    TVSHOWS_SET_PAGE,
    TVSHOWS_SET_QUERY,
} from '../types';

export function discoverTvShows(data) {
    return async dispatch => {
        dispatch({ type: TVSHOWS_START_DISCOVERING_LIST });
        try {
            const params = new URLSearchParams(data).toString();
            const tvShows = await tmdb.get(
                `/discover/tv?api_key=${process.env.tmdbApi}&${params}`);
            dispatch({
                type: TVSHOWS_END_DISCOVERING_LIST,
                payload: {
                    tvShowsList: tvShows.data.results,
                    totalPages: tvShows.data.total_pages,
                    totalResults: tvShows.data.total_results
                }
            });
        } catch (error) {
            dispatch({
                type: TVSHOWS_ERROR_DISCOVERING_LIST,
                payload: error.response.data.msg
            });
        }
    };
};

export function searchTvShows(data) {
    return async dispatch => {
        dispatch({ type: TVSHOWS_START_SEARCHING_LIST });
        try {
            const params = new URLSearchParams(data).toString();
            const tvShows = await tmdb.get(
                `/search/tv?api_key=${process.env.tmdbApi}&${params}`);
            dispatch({
                type: TVSHOWS_END_SEARCHING_LIST,
                payload: {
                    tvShowsList: tvShows.data.results,
                    totalPages: tvShows.data.total_pages,
                    totalResults: tvShows.data.total_results
                }
            });
        } catch (error) {
            dispatch({
                type: TVSHOWS_ERROR_SEARCHING_LIST,
                payload: error.response.data.msg
            });
        }
    };
};

export function setSortBy(sortBy, sortParams) {
    return dispatch => {
        dispatch({
            type: TVSHOWS_SET_SORT_BY,
            payload: {sortBy, sortParams}
        });
    };
};

export function setQuery(query) {
    return dispatch => {
        dispatch({
            type: TVSHOWS_SET_QUERY,
            payload: query
        });
    };
};

export function setPage(page) {
    return dispatch => {
        dispatch({
            type: TVSHOWS_SET_PAGE,
            payload: page
        });
    };
};