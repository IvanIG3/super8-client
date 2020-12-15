import apiTmdb from '../tmdb/apiTmdb';
import {
    TVSHOW_START_FETCHING_INFO,
    TVSHOW_END_FETCHING_INFO,
    TVSHOW_ERROR_FETCHING_INFO
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
        }
    };
};