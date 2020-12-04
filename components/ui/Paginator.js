import React from 'react';
import { Pagination } from 'react-bootstrap';

const Paginator = ({actualPage, totalPages, onClick}) => {

    // Functions
    const handleClick = e => {
        const page = e.currentTarget.querySelector('.page').innerText;
        switch(page) {
            case '>':
                onClick(actualPage + 1);
                break;
            case '<':
                onClick(actualPage - 1);
                break;
            case '>>':
                onClick(totalPages);
                break;
            case '<<':
                onClick(1);
                break;
            default:
                onClick(parseInt(page));
        }
    };

    const createPage = number => (
        <Pagination.Item
            key={number}
            active={number === actualPage}
            onClick={handleClick}
        >
            <div className="text-primary page">
                {number}
            </div>
        </Pagination.Item>
    );

    // Create pages
    let pages = [];
    if(actualPage > 1) {
        pages.push( createPage('<<') );
        pages.push( createPage('<') );
    }
    pages.push( createPage(actualPage) );
    if(actualPage < totalPages) {
        pages.push( createPage('>') );
        pages.push( createPage('>>') );
    }
    
    return (
        <Pagination>
            {pages}
        </Pagination>
    );
}
 
export default Paginator;