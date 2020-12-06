import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

// Styles
const CardBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5em;
`;

const ImageCard = ({title, image}) => {
    return (
        <Card bg="transparent" text="primary" className="h-100 flex-column">
            <Card.Img variant="top" src={image} className="flex-1"/>
            <CardBody>
                <Card.Title className="text-center" style={{fontSize: "1.1em"}}>
                    {title}
                </Card.Title>
            </CardBody>
        </Card>
    );
}
 
export default ImageCard;