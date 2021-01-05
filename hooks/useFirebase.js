import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig';

const useFirebase = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }

    const [ auth ] = useState(firebase.auth());
    const [ firestore ] = useState(firebase.firestore());

    return { auth, firestore };
};
 
export default useFirebase;