import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useUpdate from '../hooks/useUpdate';

// Icons
import { TrendingUp } from '@styled-icons/boxicons-regular/TrendingUp';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { CalendarExclamation } from '@styled-icons/boxicons-regular/CalendarExclamation';

// Components
import Layout from '../components/layout/Layout';
import SearchForm from '../components/ui/SearchForm';
import SortButtons from '../components/ui/SortButtons';
import ImageCardList from '../components/ui/ImageCardList';
import Paginator from '../components/ui/Paginator';

// Actions
import apiTmdb from '../tmdb/apiTmdb';
import useFirebaseUserCollection from '../hooks/useFirebaseUserCollection';
import { extractInfoTvShow } from '../tmdb/extractInfo';
import actions from '../actions/listActions';

const TvShowsPage = () => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    // Actions
    const {
        startFetchingList,
        searchList,
        sortList,
        setSortBy,
        setQuery,
        setPage,
    } = actions('tvShows');

    // Redux
    const sortBy = useSelector(state => state.tvShows.sortBy);
    const page = useSelector(state => state.tvShows.page);
    const query = useSelector(state => state.tvShows.query);
    const loading = useSelector(state => state.tvShows.loading);
    const tvShows = useSelector(state => state.tvShows.list);
    const totalPages = useSelector(state => state.tvShows.totalPages);
    const language = useSelector(state => state.language.language);

    // Search tv shows
    const searchTvShows = async () => {
        const tvShows = await apiTmdb(`/search/tv`, { query, language, page });
        const results = tvShows.results.map(tvShows => extractInfoTvShow(tvShows));
        const totalPages = tvShows.total_pages;
        return { results, totalPages };
    };

    // Sort tv shows
    const sortTvShows = async () => {
        const tvShows = await apiTmdb(`/tv/${sortBy}`, { language, page });
        const results = tvShows.results.map(tvShows => extractInfoTvShow(tvShows));
        const totalPages = tvShows.total_pages;
        return { results, totalPages };
    };

    // Get tv shows
    const getTvShows = () => {
        if(query) {
            dispatch(searchList(searchTvShows));
        } else if(sortBy) {
            dispatch(sortList(sortTvShows));
        }
    };

    // Listeners
    useEffect(() => loading && getTvShows(), [loading]);
    useEffect(() => {
        if(!tvShows) {
            dispatch( setSortBy('popular') );
            dispatch( startFetchingList() );
        }
    }, []);
    useUpdate(() => getTvShows(), [language]);

    // Sorting tv shows buttons
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
            name: t('on_the_air'),
            value: 'on_the_air',
            icon: <CalendarExclamation style={{width: "1.5em"}}/>
        },
    ];

    return (
        <Layout>
            <h1 className="text-center">
                {t('TV Shows')}
                {sortBy && ` - ${t(sortBy)}`}
            </h1>
            <div className="d-flex flex-column align-items-center">
                <div className="my-3">
                    <SortButtons
                        onChange={sort => {
                            dispatch(setSortBy(sort));
                            dispatch(startFetchingList());
                        }}
                        buttons={sortButtons}
                        value={sortBy}
                    />
                </div>
                <div className="my-3">
                    <SearchForm
                        query={query}
                        setQuery={query => {
                            dispatch(setQuery(query));
                            dispatch(startFetchingList());
                        }}
                        placeholder={t('Search for a Tv Show...')}
                    />
                </div>
                {!tvShows || loading ?
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                :
                    <ImageCardList 
                        items={tvShows}
                        mylist={mylist}
                        seenlist={seenlist}
                    />
                }
                <Paginator
                    page={page}
                    setPage={page => {
                        dispatch(setPage(page));
                        dispatch(startFetchingList());
                    }}
                    totalPages={totalPages}
                />
            </div>
        </Layout>
    );
}
 
export default TvShowsPage;