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

// Initial state
const initialState = {
    moviesList: [],
    loading: false,
    sortBy: 'popularity.desc',
    page: 1,
    totalPages: 1,
    totalResults: 0,
    query: null,
    language: 'es-ES',
    error: null,
};

// Reducer
const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIES_START_DISCOVERING_LIST:
        case MOVIES_START_SEARCHING_LIST:
            return {
                ...state,
                loading: true,
            };
        case MOVIES_END_DISCOVERING_LIST:
        case MOVIES_END_SEARCHING_LIST:
            return {
                ...state,
                loading: false,
                error: null,
                moviesList: action.payload.moviesList,
                totalPages: action.payload.totalPages,
                totalResults: action.payload.totalResults,
            };
        case MOVIES_ERROR_DISCOVERING_LIST:
        case MOVIES_ERROR_SEARCHING_LIST:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case MOVIES_SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload,
                query: null
            };
        case MOVIES_SET_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case MOVIES_SET_QUERY:
            return {
                ...state,
                query: action.payload,
                sortBy: null
            };
        case MOVIES_SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };
        default:
            return state;
    }
};

export default moviesReducer;