import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridList from '../ui/GridList';
import PosterCard from '../ui/PosterCard';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import { getMovieRecommendations } from '../../actions/movieActions';
import { recommendationsSelector } from '../../selectors/movieSelectors';

const MovieRecommendations = () => {
    // Hooks
    const dispatch = useDispatch();
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    // Redux
    const movie = useSelector(state => state.movie.movie);
    const list = useSelector(recommendationsSelector);
    const language = useSelector(state => state.language.language);

    // Get recommendations
    useEffect(() => {
        if (movie) {
            dispatch(getMovieRecommendations(movie.id, language));
        }
    }, [movie, language]);

    return (
        <GridList xs={2} sm={3} md={4} lg={5}>
            {(list || [...Array(20)]).map((item={}, idx) => (
                <PosterCard
                    key={idx}
                    title={item.title}
                    image={item.poster_path}
                    url={item.url}
                    score={item.vote_average * 10}
                    mylist={mylist && mylist.some(i => i.id === item.id)}
                    seen={seenlist && seenlist.some(i => i.id === item.id)}
                />
            ))}
        </GridList>
    );
};

export default MovieRecommendations;