import { useState, useEffect } from 'react';

const useAuth = ( auth ) => {
    // State
    const [ state, setState ] = useState(null);

    // Set state
    useEffect(() => {
        if(auth) {
            const unsuscribe = auth.onAuthStateChanged(user => setState(user));
            return () => unsuscribe();
        }
    }, [auth]);

    return state;
};
 
export default useAuth;