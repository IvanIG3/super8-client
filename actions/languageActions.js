import { LANGUAGE_SET_LANGUAGE } from '../types';

export function setLanguage(lang) {
    return dispatch => {
        dispatch({
            type: LANGUAGE_SET_LANGUAGE,
            payload: lang
        });
    };
};
