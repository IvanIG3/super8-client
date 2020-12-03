import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

// Styles
const CardImg = styled(Card.Img)`
    max-width: 150px;
    @media (min-width: 470px) {
        max-width: 200px;
    }
`;

const CardTitle = styled(Card.Title)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
    font-weight: bold;
    font-size: 1em;
    @media (min-width: 470px) {
        max-width: 150px;
        font-size: 1.2em;
    }
`;

const Vote = styled.p`
    position: absolute;
    margin: 0;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    font-size: 25px;
    left: calc(50% - 20px);
    top: -20px;
    background-color: black;
    color: ${props => 
        props.value >= 80 ? "#00c845" :
        props.value >= 65 ? "#f7f332" :
        props.value >= 50 ? "#ff8300" :
        "#bd2323"
    };
`;


const MovieCard = ({title, vote, posterPath}) => {
    return (
        <Card bg="primary" text="secondary">
            <CardImg
                variant="top"
                src={posterPath}
                className="position-relative"
            />
            <Vote value={vote}>
                {vote}
            </Vote>
            <Card.Body className="py-2 text-center">
                <CardTitle>
                    {title}
                </CardTitle>
            </Card.Body>
        </Card>
    );
}
 
export default MovieCard;