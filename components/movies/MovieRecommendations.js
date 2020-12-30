import React from 'react';
import { useSelector } from 'react-redux';

import GridList from '../ui/GridList';
import PosterCard from '../ui/PosterCard';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import { extractInfoMovie } from '../../tmdb/extractInfo';

const MovieRecommendations = () => {
    // Hooks
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    // Redux
    const list = useSelector(state => state.movie.recommendations);

    return (
        <GridList xs={2} sm={3} md={4} lg={5}>
            {list && list.map(item => {
                const movie = extractInfoMovie(item);
                return (
                    <PosterCard
                        key={movie.id}
                        title={movie.title}
                        image={movie.poster_path}
                        url={movie.url}
                        score={movie.vote_average * 10}
                        mylist={mylist && mylist.some(i => i.id === movie.id)}
                        seen={seenlist && seenlist.some(i => i.id === movie.id)}
                    />
                )
            })}
        </GridList>
    );
};

export default MovieRecommendations;