import React from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

const Label = ({ children }) => (
    <p
        className="d-block text-primary mb-1"
        style={{fontSize: "1.1em"}}
    >
        {children || <Skeleton/>}
    </p>
);

Label.propTypes = {
    children: PropTypes.node,
};
 
export default Label;