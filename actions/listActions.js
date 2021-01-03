import { toast } from 'react-toastify';
import {
    LIST_START_SORTING,
    LIST_END_SORTING,
    LIST_ERROR_SORTING,
    LIST_END_PREVIEW,
    LIST_ERROR_PREVIEW,
    LIST_START_SEARCHING,
    LIST_END_SEARCHING,
    LIST_ERROR_SEARCHING,
    LIST_SET_SORT_BY,
    LIST_SET_PAGE,
    LIST_SET_QUERY,
} from '../types';

export default function actions(reducer) {

    const sortList = fetchFunction => {
        return async dispatch => {
            try {
                dispatch({
                    type: LIST_START_SORTING,
                    reducer
                });
                const result = await fetchFunction();
                dispatch({
                    type: LIST_END_SORTING,
                    reducer,
                    payload: {
                        list: result.results,
                        totalPages: result.totalPages,
                    }
                });
            } catch (error) {
                dispatch({
                    type: LIST_ERROR_SORTING,
                    reducer,
                    payload: error.message
                });
                toast.error(error.message, { className: 'bg-danger' });
            }
        };
    };

    const previewList = fetchFunction => {
        return async dispatch => {
            try {
                const result = await fetchFunction();
                dispatch({
                    type: LIST_END_PREVIEW,
                    reducer,
                    payload: result
                });
            } catch (error) {
                dispatch({
                    type: LIST_ERROR_PREVIEW,
                    reducer,
                    payload: error.message
                });
                toast.error(error.message, { className: 'bg-danger' });
            }
        };
    };

    const searchList = fetchFunction => {
        return async dispatch => {
            try {
                dispatch({
                    type: LIST_START_SEARCHING,
                    reducer
                });
                const result = await fetchFunction();
                dispatch({
                    type: LIST_END_SEARCHING,
                    reducer,
                    payload: {
                        list: result.results,
                        totalPages: result.totalPages,
                    }
                });
            } catch (error) {
                dispatch({
                    type: LIST_ERROR_SEARCHING,
                    reducer,
                    payload: error.message
                });
                toast.error(error.message, { className: 'bg-danger' });
            }
        };
    };

    const setSortBy = sortBy => {
        return dispatch => {
            dispatch({
                type: LIST_SET_SORT_BY,
                reducer,
                payload: sortBy
            });
        };
    };

    const setQuery = query => {
        return dispatch => {
            dispatch({
                type: LIST_SET_QUERY,
                reducer,
                payload: query
            });
        };
    };

    const setPage = page => {
        return dispatch => {
            dispatch({
                type: LIST_SET_PAGE,
                reducer,
                payload: page
            });
        };
    };

    return {
        sortList,
        previewList,
        searchList,
        setSortBy,
        setQuery,
        setPage
    };
};