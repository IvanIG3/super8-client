import React from 'react';
import { Image } from 'react-bootstrap';

const Poster = ({ posterPath }) => {
    return (
        <Image
            fluid rounded thumbnail
            className="border-light"
            src={ posterPath }
            alt={ posterPath }
        />
    );
}
 
export default Poster;