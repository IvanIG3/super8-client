import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import GridList from '../components/ui/GridList';
import Paginator from '../components/ui/Paginator';
import PosterCard from '../components/ui/PosterCard';

// Actions
import apiTmdb from '../tmdb/apiTmdb';
import useFirebaseUserCollection from '../hooks/useFirebaseUserCollection';
import { tvShowListSelector } from '../selectors/tvShowSelectors';
import actions from '../actions/listActions';

const TvShowsPage = () => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    // Actions
    const {searchList, sortList, setSortBy, setQuery, setPage} = actions('tvShows');

    // Redux
    const sortBy = useSelector(state => state.tvShows.sortBy);
    const page = useSelector(state => state.tvShows.page);
    const query = useSelector(state => state.tvShows.query);
    const tvShows = useSelector(tvShowListSelector);
    const totalPages = useSelector(state => state.tvShows.totalPages);
    const language = useSelector(state => state.language.language);

    // Search tv shows
    const searchTvShows = async () => {
        const tvShows = await apiTmdb(`/search/tv`, { query, language, page });
        const results = tvShows.results;
        const totalPages = tvShows.total_pages;
        return { results, totalPages };
    };

    // Sort tv shows
    const sortTvShows = async () => {
        const tvShows = await apiTmdb(`/tv/${sortBy}`, { language, page });
        const results = tvShows.results;
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
    useEffect(() => !query && !sortBy && dispatch(setSortBy('popular')), []);
    useUpdate(() => getTvShows(), [language, query, sortBy, page]);

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
        <Layout description="List of popular and new TV shows">
            <h1 className="text-center">
                {t('TV Shows')}
                {sortBy && ` - ${t(sortBy)}`}
            </h1>
            <div className="d-flex flex-column align-items-center">
                <SortButtons
                    onChange={sort => dispatch(setSortBy(sort))}
                    buttons={sortButtons}
                    value={sortBy}
                />
                <SearchForm
                    query={query}
                    setQuery={query => dispatch(setQuery(query))}
                    placeholder={t('Search for a Tv Show...')}
                />
                <GridList xs={2} sm={3} md={4} lg={5}>
                    {(tvShows || [...Array(20)]).map((item={}, idx) => (
                        <PosterCard
                            key={idx}
                            title={item.title}
                            image={item.poster_path}
                            url={item.url}
                            score={item.score}
                            mylist={mylist && mylist.some(i => i.id === item.id)}
                            seen={seenlist && seenlist.some(i => i.id === item.id)}
                        />
                    ))}
                </GridList>
                <Paginator
                    page={page}
                    setPage={page => dispatch(setPage(page))}
                    totalPages={totalPages}
                />
            </div>
        </Layout>
    );
}
 
export default TvShowsPage;