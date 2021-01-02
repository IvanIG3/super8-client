import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GridList from '../ui/GridList';
import ImageCard from '../ui/ImageCard';
import Paragraph from '../ui/Paragraph';
import Label from '../ui/Label';

import { getTvShowCast } from '../../actions/tvShowActions';
import { castSelector } from '../../selectors/tvShowSelectors';

const TvShowCast = () => {
    // Hooks
    const dispatch = useDispatch();

    // Redux
    const tvShow = useSelector(state => state.tvShow.tvShow);
    const cast = useSelector(castSelector);
    const language = useSelector(state => state.language.language);

    // Get cast
    useEffect(() => {
        if (tvShow) {
            dispatch(getTvShowCast(tvShow.id, language));
        }
    }, [tvShow, language]);

    return (
        <GridList xs={2} sm={3} md={4} lg={5}>
            {(cast || [...Array(20)]).map((actor = {}, idx) => (
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

export default TvShowCast;