import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icons
import { SortAlphaDown } from '@styled-icons/bootstrap/SortAlphaDown';
import { StarFill } from '@styled-icons/bootstrap/StarFill';
import { CameraMovie } from '@styled-icons/boxicons-regular/CameraMovie';
import { TvOutline } from '@styled-icons/evaicons-outline/TvOutline';

// Components
import SearchForm from '../ui/SearchForm';
import SortButtons from '../ui/SortButtons';
import GridList from '../ui/GridList';
import Paginator from '../ui/Paginator';
import PosterCard from '../ui/PosterCard';

// Actions
import actions from '../../actions/listActions';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

// Props
const PER_PAGE = 20;

const CollectionPage = ({ collection }) => {
    // Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [ collectionList ] = useFirebaseUserCollection(collection);

    // Actions
    const {
        searchList,
        sortList,
        setSortBy,
        setQuery,
        setPage,
    } = actions(collection);

    // Redux
    const sortBy = useSelector(state => state[collection].sortBy);
    const page = useSelector(state => state[collection].page);
    const query = useSelector(state => state[collection].query);
    const filteredList = useSelector(state => state[collection].list);
    const totalPages = useSelector(state => state[collection].totalPages);
    const language = useSelector(state => state.language.language);

    const search = () => {
        const q = query.toLowerCase();
        const matches = collectionList.filter(item => item.title.toLowerCase().includes(q));
        const results = matches.slice((page - 1) * PER_PAGE, page * PER_PAGE);
        const totalPages = Math.ceil(matches.length / PER_PAGE);
        return { results, totalPages };
    };

    const sort = () => {
        let sortedlist = collectionList.slice().sort((a, b) => 
            sortBy === 'vote_average' ?
            b.vote_average - a.vote_average :
            a.title.localeCompare(b.title)
        );
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
    useEffect(() => !query && !sortBy && dispatch(setSortBy('title')), []);
    useEffect(() => getItems(), [language, query, sortBy, page, collectionList]);

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
            <SortButtons
                onChange={sort => dispatch(setSortBy(sort))}
                buttons={sortButtons}
                value={sortBy}
            />
            <SearchForm
                query={query}
                setQuery={query => dispatch(setQuery(query))}
                placeholder={t('Search for the title...')}
            />
            <GridList xs={2} sm={3} md={4} lg={5}>
                {(filteredList || [...Array(20)]).map((item={}, idx) => (
                    <PosterCard
                        key={idx}
                        title={item.title}
                        image={item.poster_path}
                        url={item.url}
                        score={item.vote_average * 10}
                    />
                ))}
            </GridList>
            <Paginator
                page={page}
                setPage={page => dispatch(setPage(page))}
                totalPages={totalPages}
            />
        </div>
    );
};

CollectionPage.propTypes = {
    collection: PropTypes.string.isRequired
};
 
export default CollectionPage;