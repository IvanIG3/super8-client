import apiTmdb from '../tmdb/apiTmdb';
import { toast } from 'react-toastify';
import {
    TVSHOWS_START_DISCOVERING_LIST,
    TVSHOWS_END_DISCOVERING_LIST,
    TVSHOWS_ERROR_DISCOVERING_LIST,
    TVSHOWS_START_PREVIEW_LIST,
    TVSHOWS_END_PREVIEW_LIST,
    TVSHOWS_ERROR_PREVIEW_LIST,
    TVSHOWS_START_SEARCHING_LIST,
    TVSHOWS_END_SEARCHING_LIST,
    TVSHOWS_ERROR_SEARCHING_LIST,
    TVSHOWS_SET_SORT_BY,
    TVSHOWS_SET_PAGE,
    TVSHOWS_SET_QUERY,
} from '../types';

export const extractInfoTvShow = tvShow => ({
    id: tvShow.id,
    title: tvShow.name,
    vote_average: tvShow.vote_average,
    poster_path: tvShow.poster_path ? 
        `${process.env.tmdbImageURL}${tvShow.poster_path}` : 'no-poster.png',
    overview: `${tvShow.overview.substring(0, 150)}...`,
    backdrop_path: tvShow.backdrop_path ? 
        `${process.env.tmdbImageURL}${tvShow.backdrop_path}` : 'no-backdrop.png',
    url: `/tvshows/${tvShow.id}`,
    type: 'tvshow'
});

export function discoverTvShows(endpoint, language, page) {
    return async dispatch => {
        dispatch({ type: TVSHOWS_START_DISCOVERING_LIST });
        try {
            const tvShows = await apiTmdb(`/tv/${endpoint}`, { language, page });
            dispatch({
                type: TVSHOWS_END_DISCOVERING_LIST,
                payload: {
                    tvShowsList: tvShows.results.map(tvShow => extractInfoTvShow(tvShow)),
                    totalPages: tvShows.total_pages,
                }
            });
        } catch (error) {
            dispatch({
                type: TVSHOWS_ERROR_DISCOVERING_LIST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function previewTvShows(endpoint, language) {
    return async dispatch => {
        dispatch({ type: TVSHOWS_START_PREVIEW_LIST });
        try {
            const tvShows = await apiTmdb(`/tv/${endpoint}`, { language });
            dispatch({
                type: TVSHOWS_END_PREVIEW_LIST,
                payload: tvShows.results.map(tvShow => extractInfoTvShow(tvShow)),
            });
        } catch (error) {
            dispatch({
                type: TVSHOWS_ERROR_PREVIEW_LIST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
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
                    tvShowsList: tvShows.results.map(tvShow => extractInfoTvShow(tvShow)),
                    totalPages: tvShows.total_pages,
                }
            });
        } catch (error) {
            dispatch({
                type: TVSHOWS_ERROR_SEARCHING_LIST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
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