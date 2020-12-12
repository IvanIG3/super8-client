import store from '../store';
import firebaseConfig from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createFirestoreInstance } from 'redux-firestore'

// RRF stores authenticated users’ data in either Cloud Firestore
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true,
};

// Initialize firebase instance
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
firebase.firestore();

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

export default rrfProps;