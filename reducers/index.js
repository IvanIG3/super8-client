import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import languageReducer from './languageReducer';
import tvShowsReducer from './tvShowsReducer';

export default combineReducers({
    movies: moviesReducer,
    tvShows: tvShowsReducer,
    language: languageReducer,
});