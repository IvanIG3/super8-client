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

// Initial state
const initialState = {
    moviesList: [],
    previewList: [],
    loading: false,
    sortBy: 'popular',
    page: 1,
    totalPages: 1,
    query: '',
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
                moviesList: [],
            };
        case MOVIES_START_PREVIEW_LIST:
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
            };
        case MOVIES_END_PREVIEW_LIST:
            return {
                ...state,
                loading: false,
                previewList: action.payload,
                error: false
            };
        case MOVIES_ERROR_DISCOVERING_LIST:
        case MOVIES_ERROR_SEARCHING_LIST:
        case MOVIES_ERROR_PREVIEW_LIST:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case MOVIES_SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload,
                query: '',
                page: 1,
                moviesList: []
            };
        case MOVIES_SET_PAGE:
            return {
                ...state,
                page: action.payload,
                moviesList: []
            };
        case MOVIES_SET_QUERY:
            return {
                ...state,
                query: action.payload,
                sortBy: '',
                page: 1,
                moviesList: []
            };
        default:
            return state;
    }
};

export default moviesReducer;