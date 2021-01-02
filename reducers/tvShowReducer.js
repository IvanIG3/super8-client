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

// Initial state
const initialState = {
    tvShow: null,
    cast: null,
    recommendations: null,
    error: null
};

// TvShow reducer
const tvShowReducer = (state = initialState, action) => {
    switch (action.type) {
        case TVSHOW_START_FETCHING_INFO:
            return {
                ...state,
                tvShow: null,
            };
        case TVSHOW_START_FETCHING_CAST:
            return {
                ...state,
                cast: null,
            };
        case TVSHOW_START_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: null,
            };
        case TVSHOW_END_FETCHING_INFO:
            return {
                ...state,
                error: null,
                tvShow: action.payload
            };
        case TVSHOW_END_FETCHING_CAST:
            return {
                ...state,
                error: null,
                cast: action.payload
            };
        case TVSHOW_END_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                error: null,
                recommendations: action.payload
            };
        case TVSHOW_ERROR_FETCHING_INFO:
        case TVSHOW_ERROR_FETCHING_CAST:
        case TVSHOW_ERROR_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                error: action.payload
            };
        case TVSHOW_CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
};

export default tvShowReducer;