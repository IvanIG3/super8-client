import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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
    const tvShowsList = useSelector(state => state.tvShows.tvShowsList);
    const sortParams = useSelector(state => state.tvShows.sortParams);
    const page = useSelector(state => state.tvShows.page);
    const query = useSelector(state => state.tvShows.query);
    const loading = useSelector(state => state.tvShows.loading);
    const language = useSelector(state => state.language.language);

    // Get Tv Shows
    useEffect(() => {
        if(query) {
            dispatch(searchTvShows({query, page, language}));
        } else {
            dispatch(discoverTvShows({...sortParams, page, language}));
        }
    }, [language, query, page, sortParams]);
    
    return (
        <Layout>
            <h1 className="text-center">{t('TV Shows')}</h1>
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
                    <TvShowsList
                        list={tvShowsList}
                    />
                }
                <TvShowsPaginator />
            </div>
        </Layout>
    );
}

export default TvShows;