import React from 'react';
import { useTranslation } from 'react-i18next';

// Icons
import { TrendingUp } from '@styled-icons/boxicons-regular/TrendingUp';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { TheaterMasks } from '@styled-icons/fa-solid/TheaterMasks';
import { CalendarExclamation } from '@styled-icons/boxicons-regular/CalendarExclamation';

// Components
import SortButtons from '../ui/SortButtons';

// Redux
import { useDispatch, useSelector } from 'react-redux';
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
        {
            name: t('popular'),
            value: 'popular',
            icon: <TrendingUp style={{width: "1.5em"}}/>
        },
        {
            name: t('top_rated'),
            value: 'top_rated',
            icon: <StarFill style={{width: "1.5em"}}/>
        },
        {
            name: t('now_playing'),
            value: 'now_playing',
            icon: <TheaterMasks style={{width: "1.5em"}}/>
        },
        {
            name: t('upcoming'),
            value: 'upcoming',
            icon: <CalendarExclamation style={{width: "1.5em"}}/>
        },
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