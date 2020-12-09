import React from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Paginator = ({page, setPage, totalPages}) => {
    // Handle on page change
    const handleClick = e => {
        const value = e.currentTarget.querySelector('.page').innerText;
        switch(value) {
            case '>':
                setPage(page + 1);
                break;
            case '<':
                setPage(page - 1);
                break;
            case '>>':
                setPage(totalPages);
                break;
            case '<<':
                setPage(1);
                break;
            default:
                setPage(parseInt(value));
        }
    };
    
    // Create page
    const createPage = number => (
        <Pagination.Item
            key={number}
            active={number === page}
            onClick={handleClick}
        >
            <div className="text-primary page">
                {number}
            </div>
        </Pagination.Item>
    );
    
    return (
        <Pagination>
            { page > 1 && createPage('<<') }
            { page > 1 && createPage('<') }
            { createPage(page) }
            { page < totalPages && createPage('>') }
            { page < totalPages && createPage('>>') }
        </Pagination>
    );
};

Paginator.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired
};
 
export default Paginator;