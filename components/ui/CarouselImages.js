import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

const CarouselCaption = styled(Carousel.Caption)`
    padding: 5px;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 10px;
`;

const MovieTitle = styled.a`
    display: block;
    margin-bottom: 5px;
    font-size: 1em;
    @media (min-width: 576px) {
        font-size: 1.5em;
        margin: 0;
    }
    &:hover {
        cursor: pointer;
    }
`;

const CarouselImages = ({items, width, height}) => {
    return (
        <Carousel>
            {items.map((item, idx) => (
                <Carousel.Item key={idx}>
                    <Link href={item.url || ""}>
                        <a>
                            <Image
                                className="rounded"
                                src={item.backdrop_path}
                                layout='responsive'
                                width={width}
                                height={height}
                            />
                        </a>
                    </Link>
                    <CarouselCaption>
                        <Link href={item.url || ""}>
                            <MovieTitle>{item.title}</MovieTitle>
                        </Link>
                        <p className="d-none d-sm-block text-justify">
                            {item.overview}
                        </p>
                    </CarouselCaption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

CarouselImages.propTypes = {
    items: PropTypes.arrayOf( PropTypes.shape({
        backdrop_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        overview: PropTypes.string,
        url: PropTypes.string
    })),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};
 
export default CarouselImages;