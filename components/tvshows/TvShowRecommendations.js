import React from 'react';
import { useSelector } from 'react-redux';

import GridList from '../ui/GridList';
import PosterCard from '../ui/PosterCard';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';
import { extractInfoTvShow } from '../../tmdb/extractInfo';

const TvShowRecommendations = () => {
    // Hooks
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    // Redux
    const list = useSelector(state => state.tvShow.recommendations);

    return (
        <GridList xs={2} sm={3} md={4} lg={5}>
            {list && list.map(item => {
                const tvshow = extractInfoTvShow(item);
                return (
                    <PosterCard
                        key={tvshow.id}
                        title={tvshow.title}
                        image={tvshow.poster_path}
                        url={tvshow.url}
                        score={tvshow.vote_average * 10}
                        mylist={mylist && mylist.some(i => i.id === tvshow.id)}
                        seen={seenlist && seenlist.some(i => i.id === tvshow.id)}
                    />
                )
            })}
        </GridList>
    );
};

export default TvShowRecommendations;