import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useUpdate from '../hooks/useUpdate';

// Icons
import { TrendingUp } from '@styled-icons/boxicons-regular/TrendingUp';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { TheaterMasks } from '@styled-icons/fa-solid/TheaterMasks';
import { CalendarExclamation } from '@styled-icons/boxicons-regular/CalendarExclamation';

// Components
import Layout from '../components/layout/Layout';
import SearchForm from '../components/ui/SearchForm';
import SortButtons from '../components/ui/SortButtons';
import Paginator from '../components/ui/Paginator';
import GridList from '../components/ui/GridList';
import PosterCard from '../components/ui/PosterCard';

// Actions
import apiTmdb from '../tmdb/apiTmdb';
import useFirebaseUserCollection from '../hooks/useFirebaseUserCollection';
import { extractInfoMovie } from '../tmdb/extractInfo';
import actions from '../actions/listActions';

const MoviesPage = () => {
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
    } = actions('movies');

    // Redux
    const sortBy = useSelector(state => state.movies.sortBy);
    const page = useSelector(state => state.movies.page);
    const query = useSelector(state => state.movies.query);
    const loading = useSelector(state => state.movies.loading);
    const movies = useSelector(state => state.movies.list);
    const totalPages = useSelector(state => state.movies.totalPages);
    const language = useSelector(state => state.language.language);

    // Search movies
    const searchMovies = async () => {
        const movies = await apiTmdb(`/search/movie`, { query, language, page });
        const results = movies.results.map(movie => extractInfoMovie(movie));
        const totalPages = movies.total_pages;
        return { results, totalPages };
    };

    // Sort movies
    const sortMovies = async () => {
        const movies = await apiTmdb(`/movie/${sortBy}`, { language, page });
        const results = movies.results.map(movie => extractInfoMovie(movie));
        const totalPages = movies.total_pages;
        return { results, totalPages };
    };

    // Get movies
    const getMovies = () => {
        if(query) {
            dispatch(searchList(searchMovies));
        } else if(sortBy) {
            dispatch(sortList(sortMovies));
        }
    };

    // Listeners
    useEffect(() => loading && getMovies(), [loading]);
    useEffect(() => {
        if(!movies) {
            dispatch( setSortBy('popular') );
            dispatch( startFetchingList() );
        }
    }, []);
    useUpdate(() => getMovies(), [language]);

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
        <Layout>
            <h1 className="text-center">
                {t('Movies')}
                {sortBy && ` - ${t(sortBy)}`}
            </h1>
            <div className="d-flex flex-column align-items-center">
                <SortButtons
                    onChange={sort => {
                        dispatch(setSortBy(sort));
                        dispatch(startFetchingList());
                    }}
                    buttons={sortButtons}
                    value={sortBy}
                />
                <SearchForm
                    query={query}
                    setQuery={query => {
                        dispatch(setQuery(query));
                        dispatch(startFetchingList());
                    }}
                    placeholder={t('Search for a movie...')}
                />
                <GridList xs={2} sm={3} md={4} lg={5}>
                    {(loading || !movies ? [...Array(20)] : movies).map((item={}, idx) => (
                        <PosterCard
                            key={idx}
                            title={item.title}
                            image={item.poster_path}
                            url={item.url}
                            score={item.vote_average * 10}
                            mylist={mylist && mylist.some(i => i.id === item.id)}
                            seen={seenlist && seenlist.some(i => i.id === item.id)}
                        />
                    ))}
                </GridList>
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
 
export default MoviesPage;