import {
    LIST_START_FETCHING,
    LIST_END_SORTING,
    LIST_ERROR_SORTING,
    LIST_END_PREVIEW,
    LIST_ERROR_PREVIEW,
    LIST_END_SEARCHING,
    LIST_ERROR_SEARCHING,
    LIST_SET_SORT_BY,
    LIST_SET_PAGE,
    LIST_SET_QUERY,
} from '../types';

const initialState = {
    list: null,
    previewList: null,
    loading: false,
    sortBy: null,
    page: 1,
    totalPages: 1,
    query: '',
    error: null,
};

const createListReducer = (nameReducer = '') => {
    return (state = initialState, action) => {
        if(action.reducer !== nameReducer) {
            return state;
        }
        switch (action.type) {
            case LIST_START_FETCHING:
                return {
                    ...state,
                    loading: true,
                };
            case LIST_END_SORTING:
            case LIST_END_SEARCHING:
                return {
                    ...state,
                    loading: false,
                    error: null,
                    list: action.payload.list,
                    totalPages: action.payload.totalPages,
                };
            case LIST_END_PREVIEW:
                return {
                    ...state,
                    loading: false,
                    error: false,
                    previewList: action.payload,
                };
            case LIST_ERROR_SORTING:
            case LIST_ERROR_PREVIEW:
            case LIST_ERROR_SEARCHING:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case LIST_SET_SORT_BY:
                return {
                    ...state,
                    sortBy: action.payload,
                    query: '',
                    page: 1,
                };
            case LIST_SET_PAGE:
                return {
                    ...state,
                    page: action.payload,
                };
            case LIST_SET_QUERY:
                return {
                    ...state,
                    query: action.payload,
                    sortBy: '',
                    page: 1,
                };
            default:
                return state;
        }
    }
};

export default createListReducer;