import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SearchForm from '../ui/SearchForm';
import { setQuery } from '../../actions/tvShowsActions';

const TvShowsSearchForm = () => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // State
    const query = useSelector(state => state.tvShows.query);

    // Set state
    const setQueryFn = query => dispatch(setQuery(query));

    return (
        <SearchForm
            query={query}
            setQuery={setQueryFn}
            placeholder={t('Search for a Tv Show...')}
        />
    );
}
 
export default TvShowsSearchForm;