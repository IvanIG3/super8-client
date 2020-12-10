import tmdb from '../config/axiosTmdb';
import {
    TVSHOW_START_FETCHING_INFO,
    TVSHOW_END_FETCHING_INFO,
    TVSHOW_ERROR_FETCHING_INFO
} from '../types';

export function getTvShow(id, language) {
    return async dispatch => {
        dispatch({ type: TVSHOW_START_FETCHING_INFO });
        try {
            const data = {
                api_key: process.env.tmdbApi,
                language
            };
            const params = new URLSearchParams(data).toString();
            const tvShow = await tmdb.get(`/tv/${id}?${params}`);
            dispatch({
                type: TVSHOW_END_FETCHING_INFO,
                payload: tvShow.data
            });
        } catch (error) {
            dispatch({
                type: TVSHOW_ERROR_FETCHING_INFO,
                payload: error.response.data.msg
            });
        }
    };
};