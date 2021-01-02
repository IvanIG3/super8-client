import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Image from './Image';

const ImageCard = ({ children, image, width, height }) => (
    <Card bg="transparent" className="border-0">
        <Image
            src={image}
            width={width}
            height={height}
        />
        <Card.Body className="py-3 px-2 text-center">
            { children }
        </Card.Body>
    </Card>
);

ImageCard.propTypes = {
    children: PropTypes.node.isRequired,
    image: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default ImageCard;