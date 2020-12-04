import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

const CarouselCaption = styled(Carousel.Caption)`
    padding: 5px;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 10px;
`;

const MovieTitle = styled.p`
    margin-bottom: 5px;
    font-size: 1em;
    @media (min-width: 576px) {
        font-size: 1.5em;
    }
`;

const CarouselImages = ({items}) => {
    return (
        <Carousel className="w-100">
            {items.map((item, idx) => (
                <Carousel.Item key={idx}>
                    <img
                        className="d-block w-100"
                        src={item.image}
                        alt={item.title}
                    />
                    <CarouselCaption>
                        <MovieTitle>{item.title}</MovieTitle>
                        {item.overview &&
                            <p className="d-none d-sm-inline-block">
                                {`${item.overview.substring(0, 150)}...`}
                            </p>
                        }
                    </CarouselCaption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
 
export default CarouselImages;