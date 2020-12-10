import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import languageReducer from './languageReducer';
import tvShowsReducer from './tvShowsReducer';
import movieReducer from './movieReducer';
import tvShowReducer from './tvShowReducer';

export default combineReducers({
    movies: moviesReducer,
    movie: movieReducer,
    tvShows: tvShowsReducer,
    tvShow: tvShowReducer,
    language: languageReducer,
});