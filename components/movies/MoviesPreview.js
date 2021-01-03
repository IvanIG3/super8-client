import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CarouselImages from '../ui/CarouselImages';
import actions from '../../actions/listActions';
import apiTmdb from '../../tmdb/apiTmdb';
import { previewMoviesSelector } from '../../selectors/movieSelectors';

const MoviesPreview = () => {
    // Redux
    const dispatch = useDispatch();
    const list = useSelector(previewMoviesSelector);
    const language = useSelector(state => state.language.language);

    // Actions
    const { sortList } = actions('previewMovies');

    // Get movies
    const previewMovies = async () => {
        const movies = await apiTmdb(`/movie/popular`, { language });
        const results = movies.results;
        const totalPages = movies.total_pages;
        return { results, totalPages };
    };

    // Get list
    useEffect(() => !list && dispatch(sortList(previewMovies)), [language]);

    return (
        <CarouselImages
            items={list}
            width={800}
            height={450}
        />
    );
};

export default MoviesPreview;