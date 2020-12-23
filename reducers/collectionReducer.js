import {
    FIRESTORE_ADD_COLLECTION,
    FIRESTORE_ADD_ITEM_TO_COLLECTION,
    FIRESTORE_REMOVE_ITEM_FROM_COLLECTION,
    FIRESTORE_REMOVE_COLLECTIONS,
} from '../types';

// Initial state
const initialState = {};

// Reducer
const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIRESTORE_ADD_COLLECTION:
            return {
                ...state,
                [ action.payload.collection ]: action.payload.data
            };
        case FIRESTORE_ADD_ITEM_TO_COLLECTION:
            return {
                ...state,
                [ action.payload.collection ]: [
                    ...state[ action.payload.collection ],
                    action.payload.item
                ]
            };
        case FIRESTORE_REMOVE_ITEM_FROM_COLLECTION:
            return {
                ...state,
                [ action.payload.collection ]: state[ action.payload.collection ].filter( item => 
                    item.id !==  action.payload.id   
                )
            };
        case FIRESTORE_REMOVE_COLLECTIONS:
            return initialState;
        default:
            return state;
    }
};

export default collectionReducer;
