import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useUpdate from '../../hooks/useUpdate';

// Icons
import { SortAlphaDown } from '@styled-icons/bootstrap/SortAlphaDown';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { CameraMovie } from '@styled-icons/boxicons-regular/CameraMovie';
import { TvOutline } from '@styled-icons/evaicons-outline/TvOutline';

// Components
import SearchForm from '../ui/SearchForm';
import SortButtons from '../ui/SortButtons';
import ImageCardList from '../ui/ImageCardList';
import Paginator from '../ui/Paginator';

// Actions
import actions from '../../actions/listActions';

// Props
const PER_PAGE = 20;

const CollectionPage = ({ collectionList, reducer }) => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Actions
    const {
        startFetchingList,
        searchList,
        sortList,
        setSortBy,
        setQuery,
        setPage,
    } = actions(reducer);

    // Redux
    const sortBy = useSelector(state => state[reducer].sortBy);
    const page = useSelector(state => state[reducer].page);
    const query = useSelector(state => state[reducer].query);
    const loading = useSelector(state => state[reducer].loading);
    const filteredList = useSelector(state => state[reducer].list);
    const totalPages = useSelector(state => state[reducer].totalPages);
    const language = useSelector(state => state.language.language);

    const search = () => {
        const q = query.toLowerCase();
        const matches = collectionList.filter(item => item.title.toLowerCase().includes(q));
        const results = matches.slice((page - 1) * PER_PAGE, page * PER_PAGE);
        const totalPages = Math.ceil(matches.length / PER_PAGE);
        return { results, totalPages };
    };

    const sort = () => {
        let sortedlist = collectionList.slice().sort((a, b) => {
            if(sortBy === 'vote_average') {
                return b.vote_average - a.vote_average;
            } else {
                return a.title.localeCompare(b.title);
            }
        });
        if(sortBy === 'tvshow' || sortBy === 'movie') {
            sortedlist = collectionList.filter(i => i.type === sortBy);
        }
        const results = sortedlist.slice((page - 1) * PER_PAGE, page * PER_PAGE);
        const totalPages = Math.ceil(sortedlist.length / PER_PAGE);
        return { results, totalPages };
    };

    const getItems = () => {
        if(collectionList) {
            if(sortBy) {
                dispatch(sortList(sort));
            } else {
                dispatch(searchList(search));
            }
        }
    };

    // Listeners
    useEffect(() => loading && getItems(), [loading]);
    useEffect(() => {
        if(collectionList && !filteredList) {
            dispatch( setSortBy('title') );
            dispatch( startFetchingList() );
        }
    }, [collectionList]);
    useUpdate(() => getItems(), [language]);

    // Sorting buttons
    const sortButtons = [
        {
            name: t('title'),
            value: 'title',
            icon: <SortAlphaDown style={{width: "1.5em"}}/>
        },
        {
            name: t('top_rated'),
            value: 'vote_average',
            icon: <StarFill style={{width: "1.5em"}}/>
        },
        {
            name: t('Movies'),
            value: 'movie',
            icon: <CameraMovie style={{width: "1.5em"}}/>
        },
        {
            name: t('TV Shows'),
            value: 'tvshow',
            icon: <TvOutline style={{width: "1.5em"}}/>
        },
    ];

    return (
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
                    placeholder={t('Search for the title...')}
                />
            </div>
            {!filteredList || loading ?
                <Spinner
                    className="my-5"
                    animation="border"
                    variant="secondary"
                />
            :
                <ImageCardList 
                    items={filteredList}
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
    );
}
 
export default CollectionPage;