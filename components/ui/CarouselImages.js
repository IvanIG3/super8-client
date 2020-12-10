import React from 'react';
import styled from 'styled-components';
import { Carousel, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
        <Carousel>
            {items.map((item, idx) => (
                <Carousel.Item key={idx}>
                    <Image
                        rounded fluid
                        className="w-100"
                        src={item.image}
                        alt={item.title}
                    />
                    <CarouselCaption>
                        <MovieTitle>{item.title}</MovieTitle>
                        {item.overview &&
                            <p className="d-none d-sm-block text-justify">
                                {`${item.overview.substring(0, 120)} ...`}
                            </p>
                        }
                    </CarouselCaption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

CarouselImages.propTypes = {
    items: PropTypes.arrayOf( PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        overview: PropTypes.string
    }))
};
 
export default CarouselImages;