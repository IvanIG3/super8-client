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
    movie: null,
    cast: null,
    recommendations: null,
    error: null,
};

// Reducer
const movieReducer = (state = initialState, action) => {
    switch(action.type) {
        case MOVIE_START_FETCHING_INFO:
            return {
                ...state,
                movie: null,
            };
        case MOVIE_START_FETCHING_CAST:
            return {
                ...state,
                cast: null,
            };
        case MOVIE_START_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: null,
            };
        case MOVIE_END_FETCHING_INFO:
            return {
                ...state,
                error: null,
                movie: action.payload
            };
        case MOVIE_END_FETCHING_CAST:
            return {
                ...state,
                error: null,
                cast: action.payload
            };
        case MOVIE_END_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                error: null,
                recommendations: action.payload
            };
        case MOVIE_ERROR_FETCHING_INFO:
        case MOVIE_ERROR_FETCHING_CAST:
        case MOVIE_ERROR_FETCHING_RECOMMENDATIONS:
            return {
                ...state,
                error: action.payload
            };
        case MOVIE_CLEAR_STATE:
            return initialState;
        default:
            return state;
    }
};

export default movieReducer;