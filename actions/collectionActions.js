import {
    FIRESTORE_ADD_COLLECTION,
    FIRESTORE_ADD_ITEM_TO_COLLECTION,
    FIRESTORE_REMOVE_ITEM_FROM_COLLECTION,
    FIRESTORE_REMOVE_COLLECTIONS,
} from '../types';

export function addCollection(collection, data) {
    return dispatch => dispatch({
        type: FIRESTORE_ADD_COLLECTION,
        payload: { collection, data }
    });
};

export function addItemToCollection(collection, item) {
    return dispatch => dispatch({
        type: FIRESTORE_ADD_ITEM_TO_COLLECTION,
        payload: { collection, item }
    });
};

export function removeItemFromCollection(collection, id) {
    return dispatch => dispatch({
        type: FIRESTORE_REMOVE_ITEM_FROM_COLLECTION,
        payload: { collection, id }
    });
};

export function removeCollections() {
    return dispatch => dispatch({
        type: FIRESTORE_REMOVE_COLLECTIONS
    });
};