import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

const CarouselContainer = styled(Carousel)`
    max-width: 650px;
`;

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
    @media (min-width: 992px) {
        font-size: 2em;
    }
`;

const CarouselImages = ({items}) => {
    return (
        <CarouselContainer>
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
        </CarouselContainer>
    );
}
 
export default CarouselImages;