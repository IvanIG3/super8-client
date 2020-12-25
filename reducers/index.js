import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import movieReducer from './movieReducer';
import tvShowReducer from './tvShowReducer';
import collectionReducer from './collectionReducer';
import createListReducer from './listReducer';

export default combineReducers({
    movies: createListReducer('movies'),
    movie: movieReducer,
    tvShows: createListReducer('tvShows'),
    tvShow: tvShowReducer,
    language: languageReducer,
    firestoreCollections: collectionReducer,
});