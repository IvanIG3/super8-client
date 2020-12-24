import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../firebase/firebaseConfig';

const useFirebase = () => {

    const [ auth, setAuth ] = useState(null);
    const [ firestore, setFirestore ] = useState(null);

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        setFirestore(firebase.firestore());
        setAuth(firebase.auth());
    }, []);

    return { auth, firestore };
};
 
export default useFirebase;