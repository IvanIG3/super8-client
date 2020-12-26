import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    addCollection,
    addItemToCollection as addItem,
    removeItemFromCollection as removeItem
} from '../actions/collectionActions';
import { firebaseContext } from '../firebase';
import useUpdate from '../hooks/useUpdate';

const PER_CHUNK = 1000;

const useFirebaseUserCollection = (collection) => {
    // States
    const collectionState = useSelector(state => state.firestoreCollections[collection]);

    // Hooks
    const dispatch = useDispatch();

    // Firestore
    const { user, firestore } = useContext(firebaseContext);
    
    const getCollectionRef = async () => {
        const userRef = await firestore.collection('users').doc(user.uid);
        const collectionRef = await userRef.collection(collection);
        return collectionRef;
    };
    
    const saveCollection = async () => {
        const collectionRef = await getCollectionRef();
        for(let i = 0; collectionState && i < collectionState.length; i += PER_CHUNK) {
            const docRef = await collectionRef.doc(i.toString());
            await docRef.set({
                json: JSON.stringify(collectionState.slice(i, i+PER_CHUNK))
            });
        }
    };
    
    // Connect to firestore
    useEffect(() => {
        if(user && !collectionState) {
            (async function() {
                try {
                    const collectionRef = await getCollectionRef();
                    const snapshot = await collectionRef.get();
                    const data = snapshot.docs.map(doc => {
                        const strData = Object.values(doc.data());
                        return JSON.parse(strData);
                    });
                    dispatch( addCollection(collection, data.flat()) );
                } catch(error) {
                    toast.error(error.message, { className: 'bg-danger' });
                }
            })();
        }
    }, [user]);

    // Save changes made into the collection
    useUpdate(() => collectionState && saveCollection(), [collectionState]);

    // Add item to collection
    const addItemToCollection = async (item) => {
        try {
            dispatch( addItem(collection, item) );
        } catch (error) {
            toast.error(error.message, { className: 'bg-danger' });
        }
    };

    // Remove item from collection
    const removeItemToCollection = async (id) => {
        try {
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