import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CarouselImages from '../ui/CarouselImages';
import actions from '../../actions/listActions';
import apiTmdb from '../../tmdb/apiTmdb';
import { previewTvShowsSelector } from '../../selectors/tvShowSelectors';

const TvShowsPreview = () => {
    // Redux
    const dispatch = useDispatch();
    const list = useSelector(previewTvShowsSelector);
    const language = useSelector(state => state.language.language);

    // Actions
    const { sortList } = actions('previewTvShows');

    // Preview tv shows
    const previewTvShows = async () => {
        const tvShows = await apiTmdb(`/tv/popular`, { language });
        const results = tvShows.results;
        const totalPages = tvShows.total_pages;
        return { results, totalPages };
    };

    // Get list
    useEffect(() => !list && dispatch(sortList(previewTvShows)), [language]);

    return (
        <CarouselImages 
            items={list} 
            width={800}
            height={450}
        />
    );
};

export default TvShowsPreview;