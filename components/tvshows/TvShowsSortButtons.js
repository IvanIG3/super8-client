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

    // Get sort params by button value
    const getSortParams = sortMethod => {
        switch(sortMethod) {
            case 'popular':
                return {
                    sort_by: 'popularity.desc'
                };
            case 'best':
                return {
                    sort_by: 'vote_average.desc',
                    'vote_count.gte': 1000,
                };
            case 'release':
                return {
                    sort_by: 'first_air_date.desc',
                    'first_air_date.lte': (new Date()).toISOString().split('T')[0]
                };
        }
    };

    // Handler
    const handleChange = selectedButton => {
        const sortParams = getSortParams(selectedButton);
        dispatch( setSortBy(selectedButton, sortParams) );
    };

    // Sorting tv shows buttons
    const sortButtons = [
        { name: t('Popular'), value: 'popular'},
        { name: t('Best TV Shows'), value: 'best'},
        { name: t('Releases'), value: 'release'},
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