import { useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useUpdate from './useUpdate';
import {
    addCollection,
    addItemToCollection as addItem,
    removeItemFromCollection as removeItem
} from '../actions/collectionActions';

const useFirebaseUserCollection = (collection) => {
    // States
    const uid = useSelector(state => state.firebase.auth.uid);
    const collectionState = useSelector(state => state.firestoreCollections[collection]);
    const firestoreCollection = useSelector(state => state.firestore.data[collection]);

    // Hooks
    const firestore = useFirestore();
    const dispatch = useDispatch();
    
    // Connect to firestore
    useEffect(() => {
        (async function() {
            if(uid && !collectionState) {
                firestore.get({
                    collection: 'users',
                    doc: uid, 
                    subcollections: [{ collection }],
                    storeAs: collection
                });
            }
        })();
    }, [uid]);

    // Read result from query
    useUpdate(() => {
        dispatch( addCollection(collection, Object.values(firestoreCollection)) );
    }, [firestoreCollection]);

    // Add item to collection
    const addItemToCollection = async (id, item) => {
        try {
            await firestore
                .collection('users').doc(uid)
                .collection(collection).doc(id.toString()).set(item);
            dispatch( addItem(collection, item) );
        } catch (error) {
            toast.error(error.message, { className: 'bg-danger' });
        }
    };

    // Remove item from collection
    const removeItemToCollection = async (id) => {
        try {
            await firestore
                .collection('users').doc(uid)
                .collection(collection).doc(id.toString()).delete();
            dispatch( removeItem(collection, id) );
        } catch (error) {
            toast.error(error.message, { className: 'bg-danger' });
        }
    };

    return [
        collectionState,
        addItemToCollection,
        removeItemToCollection
    ];
};
 
export default useFirebaseUserCollection;