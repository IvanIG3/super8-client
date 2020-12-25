import React from 'react';
import { useSelector } from 'react-redux';

import ImageCardList from '../ui/ImageCardList';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const MoviesList = () => {
    
    const items = useSelector(state => state.movies.moviesList);
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    return (
        <ImageCardList 
            items={items}
            mylist={mylist}
            seenlist={seenlist}
        />
    );
};
 
export default MoviesList;