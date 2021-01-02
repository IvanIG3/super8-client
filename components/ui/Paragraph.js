import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

const Paragraph = ({ children, count=1 }) => {
    return (
        <p className="d-block mb-4">
            {children || <Skeleton count={count}/>}
        </p>
    );
};

Paragraph.propTypes = {
    children: PropTypes.node,
    count: PropTypes.number,
};
 
export default Paragraph;