import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridList from '../ui/GridList';
import PosterCard from '../ui/PosterCard';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import { getTvShowRecommendations } from '../../actions/tvShowActions';
import { recommendationsSelector } from '../../selectors/tvShowSelectors';

const TvShowRecommendations = () => {
    // Hooks
    const dispatch = useDispatch();
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    // Redux
    const tvShow = useSelector(state => state.tvShow.tvShow);
    const list = useSelector(recommendationsSelector);
    const language = useSelector(state => state.language.language);

    // Get recommendations
    useEffect(() => {
        if (tvShow) {
            dispatch(getTvShowRecommendations(tvShow.id, language));
        }
    }, [tvShow, language]);

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

export default TvShowRecommendations;