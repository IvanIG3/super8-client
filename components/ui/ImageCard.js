import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Styles
const CardContainer = styled.div`
    height: 5em;
`;

const ImageCard = ({title, text, image}) => {
    return (
        <Card bg="transparent" className="h-100 flex-column">
            <Card.Img variant="top" src={image} className="flex-1 rounded"/>
            <CardContainer>
                <Card.Body className="py-3 px-0">
                    <Card.Title className="text-center text-primary" style={{fontSize: "1.1em"}}>
                        {title}
                    </Card.Title>
                    <Card.Text className="text-center" style={{fontSize: "1em"}}>
                        {text}
                    </Card.Text>
                </Card.Body>
            </CardContainer>
        </Card>
    );
};

ImageCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string.isRequired,
    text: PropTypes.string,
};
 
export default ImageCard;