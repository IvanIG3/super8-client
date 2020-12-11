import React from 'react';
import { useTranslation } from 'react-i18next';

// Icons
import { TrendingUp } from '@styled-icons/boxicons-regular/TrendingUp';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { CalendarExclamation } from '@styled-icons/boxicons-regular/CalendarExclamation';

// Components
import SortButtons from '../ui/SortButtons';

// Redux
import { useDispatch, useSelector } from 'react-redux';
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
        {
            name: t('Popular'),
            value: 'popular',
            icon: <TrendingUp style={{width: "1.5em"}}/>
        },
        {
            name: t('Top rated'),
            value: 'top_rated',
            icon: <StarFill style={{width: "1.5em"}}/>
        },
        {
            name: t('This week'),
            value: 'on_the_air',
            icon: <CalendarExclamation style={{width: "1.5em"}}/>
        },
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