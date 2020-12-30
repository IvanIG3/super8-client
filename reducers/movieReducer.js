import {
    MOVIE_START_FETCHING_INFO,
    MOVIE_START_FETCHING_CAST,
    MOVIE_START_FETCHING_RECOMMENDATIONS,
    MOVIE_END_FETCHING_INFO,
    MOVIE_END_FETCHING_CAST,
    MOVIE_END_FETCHING_RECOMMENDATIONS,
    MOVIE_ERROR_FETCHING_INFO,
    MOVIE_ERROR_FETCHING_CAST,
    MOVIE_ERROR_FETCHING_RECOMMENDATIONS,
    MOVIE_CLEAR_STATE,
} from '../types';

// Initial state
const initialState = {
    loading: false,
    movie: null,
    cast: null,
    recommendations: null,
    error: null,
};

// Reducer
const movieReducer = (state = initialState, action) => {
    switch(action.type) {
        case MOVIE_START_FETCHING_INFO:
        case MOVIE_START_FETCHING_CAST:
        case MOVIE_START_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                loading: true,
                movie: null,
                cast: null,
            };
        case MOVIE_END_FETCHING_INFO:
            return {
                ...state,
                loading: false,
                error: null,
                movie: action.payload
            };
        case MOVIE_END_FETCHING_CAST:
            return {
                ...state,
                loading: false,
                error: null,
                cast: action.payload
            };
        case MOVIE_END_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                loading: false,
                error: null,
                recommendations: action.payload
            };
        case MOVIE_ERROR_FETCHING_INFO:
        case MOVIE_ERROR_FETCHING_CAST:
        case MOVIE_ERROR_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case MOVIE_CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
};

export default movieReducer;