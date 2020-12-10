import {
    TVSHOW_START_FETCHING_INFO,
    TVSHOW_END_FETCHING_INFO,
    TVSHOW_ERROR_FETCHING_INFO
} from '../types';

// Initial state
const initialState = {
    loading: false,
    tvShow: null,
    error: null
};

// TvShow reducer
const tvShowReducer = (state = initialState, action) => {
    switch (action.type) {
        case TVSHOW_START_FETCHING_INFO:
            return {
                ...state,
                loading: true,
                tvShow: null,
            };
        case TVSHOW_END_FETCHING_INFO:
            return {
                ...state,
                loading: false,
                error: null,
                tvShow: action.payload
            };
        case TVSHOW_ERROR_FETCHING_INFO:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default tvShowReducer;