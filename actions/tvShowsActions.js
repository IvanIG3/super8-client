import apiTmdb from '../tmdb/apiTmdb';
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

export function discoverTvShows(endpoint, language, page) {
    return async dispatch => {
        dispatch({ type: TVSHOWS_START_DISCOVERING_LIST });
        try {
            const tvShows = await apiTmdb(`/tv/${endpoint}`, { language, page });
            dispatch({
                type: TVSHOWS_END_DISCOVERING_LIST,
                payload: {
                    tvShowsList: tvShows.results,
                    totalPages: tvShows.total_pages,
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

export function searchTvShows(query, language, page) {
    return async dispatch => {
        dispatch({ type: TVSHOWS_START_SEARCHING_LIST });
        try {
            const tvShows = await apiTmdb(`/search/tv`, { query, language, page });
            dispatch({
                type: TVSHOWS_END_SEARCHING_LIST,
                payload: {
                    tvShowsList: tvShows.results,
                    totalPages: tvShows.total_pages,
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

export function setSortBy(sortBy) {
    return dispatch => {
        dispatch({
            type: TVSHOWS_SET_SORT_BY,
            payload: sortBy
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