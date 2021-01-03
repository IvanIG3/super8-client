import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

import Image from './Image';

const CarouselCaption = styled(Carousel.Caption)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 75%;
    padding: 5px;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 10px;
`;

const MovieTitle = styled.a`
    display: block;
    height: 100%;
    margin-bottom: 5px;
    font-size: 1em;
    @media (min-width: 400px) {
        font-size: 1.5em;
    }
    @media (min-width: 576px) {
        height: auto;
        margin: 0;
    }
    &:hover {
        cursor: pointer;
    }
`;

const Overview = styled.p`
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CarouselImages = ({items, width, height}) => {
    return (
        <Carousel>
            {items ? 
                items.map((item, idx) => (
                    <Carousel.Item key={idx}>
                        <Link href={item.url}>
                            <a>
                                <Image
                                    src={item.backdrop_path}
                                    width={width}
                                    height={height}
                                />
                            </a>
                        </Link>
                        <CarouselCaption>
                            <Link href={item.url}>
                                <MovieTitle>{item.title}</MovieTitle>
                            </Link>
                            <Overview className="d-none d-sm-block">
                                {item.overview}
                            </Overview>
                        </CarouselCaption>
                    </Carousel.Item>
                ))
            :
                <Skeleton style={{
                    paddingBottom: `${(height/width)*100}%`,
                    lineHeight: 0,
                    display: "block"
                }}/>
            }
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