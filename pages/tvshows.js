import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useUpdate from '../hooks/useUpdate';

// Components
import Layout from '../components/layout/Layout';
import TvShowsList from '../components/tvShows/TvShowsList';
import TvShowsSortButtons from '../components/tvshows/TvShowsSortButtons';
import TvShowsSearchForm from '../components/tvshows/TvShowsSearchForm';
import TvShowsPaginator from '../components/tvshows/TvShowsPaginator';

// Redux actions
import { discoverTvShows, searchTvShows } from '../actions/tvShowsActions';

const TvShows = () => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Redux
    const sortBy = useSelector(state => state.tvShows.sortBy);
    const page = useSelector(state => state.tvShows.page);
    const query = useSelector(state => state.tvShows.query);
    const loading = useSelector(state => state.tvShows.loading);
    const language = useSelector(state => state.language.language);
    const tvShows = useSelector(state => state.tvShows.tvShowsList);

    // Get Tv Shows
    const getTvShows = () => {
        if(query) {
            dispatch(searchTvShows(query, language, page));
        } else {
            dispatch(discoverTvShows(sortBy, language, page));
        }
    };

    useEffect(() => {
        if(tvShows.length === 0) {
            getTvShows();
        }
    }, [query, page, sortBy]);

    useUpdate(() => getTvShows(), [language]);
    
    return (
        <Layout>
            <h1 className="text-center">{t('TV Shows')} - {t(sortBy)}</h1>
            <div className="d-flex flex-column align-items-center">
                <div className="my-3">
                    <TvShowsSortButtons />
                </div>
                <div className="my-3">
                    <TvShowsSearchForm />
                </div>
                {loading ?
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                :
                    <TvShowsList />
                }
                <TvShowsPaginator />
            </div>
        </Layout>
    );
}

export default TvShows;