import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setQuery } from '../../actions/moviesActions';
import SearchForm from '../ui/SearchForm';

const MoviesSearchForm = () => {

    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // State
    const query = useSelector(state => state.movies.query);

    // Set state
    const setQueryFn = query => dispatch(setQuery(query));

    return (
        <SearchForm
            query={query}
            setQuery={setQueryFn}
            placeholder={t('Search for a movie...')}
        />
    );
}
 
export default MoviesSearchForm;