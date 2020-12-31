import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

const ImageCard = ({ title, text, image, width, height }) => (
    <Card bg="transparent" className="border-0">
        {!image ?
            <Skeleton style={{
                paddingBottom: `${(height/width)*100}%`,
                lineHeight: 0,
                display: "block"
            }}/>
        :
            <Image
                className="rounded"
                src={image}
                layout='responsive'
                width={width}
                height={height}
            />
        }
        <Card.Body className="py-3 px-0">
            <Card.Title className="text-center text-primary" style={{ fontSize: "1.1em" }}>
                {title || <Skeleton />}
            </Card.Title>
            <Card.Text className="text-center" style={{ fontSize: "1em" }}>
                {text}
            </Card.Text>
        </Card.Body>
    </Card>
);

ImageCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

export default ImageCard;