import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

// Styles
const CardBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
`;

const CardTitle = styled(Card.Title)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 50vw;
    font-size: 1.1em;
`;

const ImageCard = ({title, image}) => {
    return (
        <Card bg="transparent" text="primary" className="h-100 flex-column">
            <Card.Img variant="top" src={image} className="flex-1"/>
            <CardBody>
                <CardTitle className="px-1">
                    {title}
                </CardTitle>
            </CardBody>
        </Card>
    );
}
 
export default ImageCard;