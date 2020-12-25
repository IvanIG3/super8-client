import apiTmdb from '../tmdb/apiTmdb';
import { toast } from 'react-toastify';
import {
    MOVIES_START_DISCOVERING_LIST,
    MOVIES_END_DISCOVERING_LIST,
    MOVIES_ERROR_DISCOVERING_LIST,
    MOVIES_START_PREVIEW_LIST,
    MOVIES_END_PREVIEW_LIST,
    MOVIES_ERROR_PREVIEW_LIST,
    MOVIES_START_SEARCHING_LIST,
    MOVIES_END_SEARCHING_LIST,
    MOVIES_ERROR_SEARCHING_LIST,
    MOVIES_SET_SORT_BY,
    MOVIES_SET_PAGE,
    MOVIES_SET_QUERY,
} from '../types';


export const extractInfoMovie = movie => ({
    id: movie.id,
    title: movie.title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path ? 
        `${process.env.tmdbImageURL}${movie.poster_path}` : 'no-poster.png',
    overview: `${movie.overview.substring(0, 150)}...`,
    backdrop_path: movie.backdrop_path ? 
        `${process.env.tmdbImageURL}${movie.backdrop_path}` : 'no-backdrop.png',
    url: `/movies/${movie.id}`,
    type: 'movie'
});


export function discoverMovies(endpoint, language, page) {
    return async dispatch => {
        dispatch({ type: MOVIES_START_DISCOVERING_LIST });
        try {
            const movies = await apiTmdb(`/movie/${endpoint}`, { language, page });
            dispatch({
                type: MOVIES_END_DISCOVERING_LIST,
                payload: {
                    moviesList: movies.results.map(movie => extractInfoMovie(movie)),
                    totalPages: movies.total_pages,
                }
            });
        } catch (error) {
            dispatch({
                type: MOVIES_ERROR_DISCOVERING_LIST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function previewMovies(endpoint, language) {
    return async dispatch => {
        dispatch({ type: MOVIES_START_PREVIEW_LIST });
        try {
            const movies = await apiTmdb(`/movie/${endpoint}`, { language });
            dispatch({
                type: MOVIES_END_PREVIEW_LIST,
                payload: movies.results.map(movie => extractInfoMovie(movie)),
            });
        } catch (error) {
            dispatch({
                type: MOVIES_ERROR_PREVIEW_LIST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function searchMovies(query, language, page) {
    return async dispatch => {
        dispatch({ type: MOVIES_START_SEARCHING_LIST });
        try {
            const movies = await apiTmdb(`/search/movie`, { query, language, page });
            dispatch({
                type: MOVIES_END_SEARCHING_LIST,
                payload: {
                    moviesList: movies.results.map(movie => extractInfoMovie(movie)),
                    totalPages: movies.total_pages,
                }
            });
        } catch (error) {
            dispatch({
                type: MOVIES_ERROR_SEARCHING_LIST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
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

