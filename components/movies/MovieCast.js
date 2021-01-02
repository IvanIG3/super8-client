import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridList from '../ui/GridList';
import ImageCard from '../ui/ImageCard';
import Paragraph from '../ui/Paragraph';
import Label from '../ui/Label';

import { getMovieCast } from '../../actions/movieActions';
import { castSelector } from '../../selectors/movieSelectors';

const MovieCast = () => {
    // Hooks
    const dispatch = useDispatch();

    // Redux
    const movie = useSelector(state => state.movie.movie);
    const cast = useSelector(castSelector);
    const language = useSelector(state => state.language.language);

    // Get cast
    useEffect(() => {
        if (movie) {
            dispatch(getMovieCast(movie.id, language));
        }
    }, [movie, language]);

    return (
        <GridList xs={2} sm={3} md={4} lg={5}>
            {(cast || [...Array(20)]).map((actor={}, idx) => (
                <ImageCard
                    key={idx}
                    image={actor.profile_path}
                    width={400}
                    height={600}
                >
                    <Label>{actor.name}</Label>
                    <Paragraph>{actor.character}</Paragraph>
                </ImageCard>
            ))}
        </GridList>
    );
}
 
export default MovieCast;