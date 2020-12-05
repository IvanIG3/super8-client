import { LANGUAGE_SET_LANGUAGE } from '../types';

// Initial state
const initialState = {
    language: process.env.defaultLanguage
}

// Reducer function
const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LANGUAGE_SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };
        default:
            return state;
    }
};

export default languageReducer;