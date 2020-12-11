import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SortButtons from '../ui/SortButtons';
import { setSortBy } from '../../actions/tvShowsActions';

const TvShowsSortButtons = () => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // State
    const sortBy = useSelector(state => state.tvShows.sortBy);

    // Handler
    const handleChange = selectedButton => {
        dispatch(setSortBy(selectedButton));
    };

    // Sorting tv shows buttons
    const sortButtons = [
        { name: t('Popular'), value: 'popular'},
        { name: t('Top rated'), value: 'top_rated'},
        { name: t('This week'), value: 'on_the_air'},
    ];

    return (
        <SortButtons
            buttons={sortButtons}
            onChange={handleChange}
            value={sortBy}
        />
    );
}
 
export default TvShowsSortButtons;