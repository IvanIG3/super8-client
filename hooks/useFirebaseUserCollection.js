import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    addCollection,
    addItemToCollection as addItem,
    removeItemFromCollection as removeItem
} from '../actions/collectionActions';
import { firebaseContext } from '../firebase';

const useFirebaseUserCollection = (collection) => {
    // States
    const collectionState = useSelector(state => state.firestoreCollections[collection]);

    // Hooks
    const dispatch = useDispatch();

    // Firebase
    const { user, firestore } = useContext(firebaseContext);
    const getCollectionRef = async () => {
        const userRef = await firestore.collection('users').doc(user.uid);
        const collectionRef = await userRef.collection(collection);
        return collectionRef;
    };
    
    // Connect to firestore
    useEffect(() => {
        if(user && !collectionState) {
            (async function() {
                const collectionRef = await getCollectionRef();
                const snapshot = await collectionRef.get();
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                dispatch( addCollection(collection, data) );
            })();
        }
    }, [user]);

    // Add item to collection
    const addItemToCollection = async (id, item) => {
        try {
            const collectionRef = await getCollectionRef();
            const docRef = await collectionRef.doc(id.toString());
            await docRef.set(item);
            dispatch( addItem(collection, item) );
        } catch (error) {
            toast.error(error.message, { className: 'bg-danger' });
        }
    };

    // Remove item from collection
    const removeItemToCollection = async (id) => {
        try {
            const collectionRef = await getCollectionRef();
            const docRef = await collectionRef.doc(id.toString());
            await docRef.delete();
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