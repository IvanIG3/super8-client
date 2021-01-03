import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import movieReducer from './movieReducer';
import tvShowReducer from './tvShowReducer';
import collectionReducer from './collectionReducer';
import createListReducer from './listReducer';

export default combineReducers({
    movies: createListReducer('movies'),
    previewMovies: createListReducer('previewMovies'),
    movie: movieReducer,
    tvShows: createListReducer('tvShows'),
    previewTvShows: createListReducer('previewTvShows'),
    tvShow: tvShowReducer,
    mylist: createListReducer('mylist'),
    seen: createListReducer('seen'),
    favorites: createListReducer('favorites'),
    language: languageReducer,
    firestoreCollections: collectionReducer,
});