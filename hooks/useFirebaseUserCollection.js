import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useFirebaseUserCollection = (collection) => {
    // States
    const uid = useSelector(state => state.firebase.auth.uid);
    const collectionState = useSelector(state => state.firestore.data[collection]);

    // Firestore hook
    const firestore = useFirestore();
    
    // Connect to firestore
    useFirestoreConnect(uid && [
        {
            collection: 'users',
            doc: uid, 
            subcollections: [{ collection }],
            storeAs: collection
        }
    ]);

    // Add item to collection
    const addItemToCollection = async (id, item) => {
        try {
            await firestore
                .collection('users').doc(uid)
                .collection(collection).doc(id.toString()).set(item);
        } catch (error) {
            toast.error(error, { className: 'bg-danger' });
        }
    };

    // Remove item from collection
    const removeItemToCollection = async (id) => {
        try {
            await firestore
                .collection('users').doc(uid)
                .collection(collection).doc(id.toString()).delete();
        } catch (error) {
            toast.error(error, { className: 'bg-danger' });
        }
    };

    return [
        collectionState ?
            Object.values(collectionState).filter(i => i !== null) : 
            null,
        addItemToCollection,
        removeItemToCollection
    ];
};
 
export default useFirebaseUserCollection;