import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SortButtons from '../ui/SortButtons';
import { setSortBy } from '../../actions/moviesActions';

const MoviesSortButtons = () => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // State
    const sortBy = useSelector(state => state.movies.sortBy);

    // Handler
    const handleChange = selectedButton => {
        dispatch(setSortBy(selectedButton));
    };

    // Sorting movie buttons
    const sortButtons = [
        { name: t('Popular'), value: 'popular'},
        { name: t('Top rated'), value: 'top_rated'},
        { name: t('In theaters'), value: 'now_playing'},
        { name: t('Soon'), value: 'upcoming'},
    ];

    return (
        <SortButtons
            onChange={handleChange}
            buttons={sortButtons}
            value={sortBy}
        />
    );
}
 
export default MoviesSortButtons;