import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import languageReducer from './languageReducer';

export default combineReducers({
    movies: moviesReducer,
    language: languageReducer,
});