import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../ui/Paginator';
import { setPage } from '../../actions/moviesActions';

const MoviesPaginator = () => {

    // State
    const page = useSelector(state => state.movies.page);
    const totalPages = useSelector(state => state.movies.totalPages);
    
    // Set state
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
 
export default MoviesPaginator;