import React from 'react';
import { useSelector } from 'react-redux';

import GridList from '../ui/GridList';
import ImageCard from '../ui/ImageCard';

const TvShowCast = () => {

    // Redux
    const cast = useSelector(state => state.tvShow.cast);

    return (
        <GridList xs={2} sm={3} md={4} lg={5}>
            {cast && cast.map(actor => (
                <div className="my-4">
                    <ImageCard
                        key={actor.id}
                        image={actor.profile_path ?
                            `${process.env.tmdbProfileURL}${actor.profile_path}` :
                            '/no-poster.png'
                        }
                        title={actor.name}
                        text={actor.roles && actor.roles.length > 0 && actor.roles[0].character}
                    />
                </div>
            ))}
        </GridList>
    );
}
 
export default TvShowCast;