import store from '../store';
import initFirebase from './initFirebase';
import firebase from 'firebase/app';
import { createFirestoreInstance } from 'redux-firestore';

// Initialize firebase instance
initFirebase();

const rrfProps = {
    firebase,
    config: {
        userProfile: 'users',
        useFirestoreForProfile: true,
    },
    dispatch: store.dispatch,
    createFirestoreInstance
};

export default rrfProps;