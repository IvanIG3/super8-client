import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../ui/Paginator';
import { setPage } from '../../actions/tvShowsActions';

const TvShowsPaginator = () => {
    // State
    const page = useSelector(state => state.tvShows.page);
    const totalPages = useSelector(state => state.tvShows.totalPages);

    // Set state functions
    const dispatch = useDispatch();
    const setPageFn = page => dispatch(setPage(page));

    return (
        <Paginator
            page={page}
            setPage={setPageFn}
            totalPages={totalPages}
        />
    );
}
 
export default TvShowsPaginator;