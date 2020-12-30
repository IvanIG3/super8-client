import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Image from 'next/image';

const ImageCard = ({title, text, image, width, height}) => {
    return (
        <Card bg="transparent" className="h-100 flex-column">
            <Image
                className="rounded"
                src={image}
                layout='responsive'
                width={width}
                height={height}
            />
            <Card.Body className="py-3 px-0">
                <Card.Title className="text-center text-primary" style={{fontSize: "1.1em"}}>
                    {title}
                </Card.Title>
                <Card.Text className="text-center" style={{fontSize: "1em"}}>
                    {text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

ImageCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string.isRequired,
    text: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};
 
export default ImageCard;