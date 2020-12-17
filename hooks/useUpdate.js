import { useEffect, useRef } from 'react';

const useUpdate = (callback, dependences) => {
    // Use ref don't cause rerender
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            // Call callback only after mount
            callback();
        } else {
            // Component did mount
            didMount.current = true;
        }
    }, dependences);
}

export default useUpdate;