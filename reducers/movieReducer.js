import {
    MOVIE_START_FETCHING_INFO,
    MOVIE_END_FETCHING_INFO,
    MOVIE_ERROR_FETCHING_INFO
} from '../types';

// Initial state
const initialState = {
    loading: false,
    movie: null,
    error: null,
};

// Reducer
const movieReducer = (state = initialState, action) => {
    switch(action.type) {
        case MOVIE_START_FETCHING_INFO:
            return {
                ...state,
                loading: true,
                movie: null,
            };
        case MOVIE_END_FETCHING_INFO:
            return {
                ...state,
                loading: false,
                error: null,
                movie: action.payload
            };
        case MOVIE_ERROR_FETCHING_INFO:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default movieReducer;