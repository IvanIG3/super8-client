import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';

const devTools = 
    process.env.NODE_ENV !== "production" &&
    typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        devTools
    )
);

export default store;