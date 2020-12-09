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

// Initial state
const initialState = {
    tvShowsList: [],
    loading: false,
    sortBy: 'popular',
    sortParams: {
        sort_by: 'popularity.desc'
    },
    page: 1,
    totalPages: 1,
    totalResults: 0,
    query: '',
    error: null,
};

const tvShowsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TVSHOWS_START_DISCOVERING_LIST:
        case TVSHOWS_START_SEARCHING_LIST:
            return {
                ...state,
                loading: true,
            };
        case TVSHOWS_END_DISCOVERING_LIST:
        case TVSHOWS_END_SEARCHING_LIST:
            return {
                ...state,
                loading: false,
                error: null,
                tvShowsList: action.payload.tvShowsList,
                totalPages: action.payload.totalPages,
                totalResults: action.payload.totalResults,
            };
        case TVSHOWS_ERROR_DISCOVERING_LIST:
        case TVSHOWS_ERROR_SEARCHING_LIST:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case TVSHOWS_SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload.sortBy,
                sortParams: action.payload.sortParams,
                query: '',
                page: 1,
            };
        case TVSHOWS_SET_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case TVSHOWS_SET_QUERY:
            return {
                ...state,
                query: action.payload,
                sortBy: '',
                sortParams: {},
                page: 1,
            };
        default:
            return state;
    }
};

export default tvShowsReducer;