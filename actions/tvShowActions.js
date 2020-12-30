import apiTmdb from '../tmdb/apiTmdb';
import { toast } from 'react-toastify';
import {
    TVSHOW_START_FETCHING_INFO,
    TVSHOW_START_FETCHING_CAST,
    TVSHOW_START_FETCHING_RECOMMENDATIONS,
    TVSHOW_END_FETCHING_INFO,
    TVSHOW_END_FETCHING_CAST,
    TVSHOW_END_FETCHING_RECOMMENDATIONS,
    TVSHOW_ERROR_FETCHING_INFO,
    TVSHOW_ERROR_FETCHING_CAST,
    TVSHOW_ERROR_FETCHING_RECOMMENDATIONS,
    TVSHOW_CLEAR_STATE,
} from '../types';

export function getTvShow(id, language) {
    return async dispatch => {
        dispatch({ type: TVSHOW_START_FETCHING_INFO });
        try {
            const tvShow = await apiTmdb(`/tv/${id}`, { language });
            dispatch({
                type: TVSHOW_END_FETCHING_INFO,
                payload: tvShow
            });
        } catch (error) {
            dispatch({
                type: TVSHOW_ERROR_FETCHING_INFO,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function getTvShowCast(id, language) {
    return async dispatch => {
        dispatch({ type: TVSHOW_START_FETCHING_CAST });
        try {
            const result = await apiTmdb(`/tv/${id}/aggregate_credits`, { language });
            dispatch({
                type: TVSHOW_END_FETCHING_CAST,
                payload: result.cast
            });
        } catch (error) {
            dispatch({
                type: TVSHOW_ERROR_FETCHING_CAST,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function getTvShowRecommendations(id, language) {
    return async dispatch => {
        dispatch({ type: TVSHOW_START_FETCHING_RECOMMENDATIONS });
        try {
            const result = await apiTmdb(`/tv/${id}/recommendations`, { language });
            dispatch({
                type: TVSHOW_END_FETCHING_RECOMMENDATIONS,
                payload: result.results
            });
        } catch (error) {
            dispatch({
                type: TVSHOW_ERROR_FETCHING_RECOMMENDATIONS,
                payload: error.response.data.msg
            });
            toast.error(error.response.data.msg, { className: 'bg-danger' });
        }
    };
};

export function clearState() {
    return dispatch => dispatch({ type: TVSHOW_CLEAR_STATE });
};
