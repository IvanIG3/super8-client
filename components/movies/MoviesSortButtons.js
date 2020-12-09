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
                    sort_by: 'primary_release_date.desc',
                    'primary_release_date.lte': (new Date()).toISOString().split('T')[0]
                };
        }
    };

    // Handler
    const handleChange = selectedButton => {
        const sortParams = getSortParams(selectedButton);
        dispatch( setSortBy(selectedButton, sortParams) );
    };

    // Sorting movie buttons
    const sortButtons = [
        { name: t('Popular'), value: 'popular'},
        { name: t('Most voted'), value: 'best'},
        { name: t('Releases'), value: 'release'},
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