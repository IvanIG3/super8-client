import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import MyListTag from '../ui/MyListTag';
import SeenTag from '../ui/SeenTag';
import Label from '../ui/Label';

const PosterCard = ({ title, image, url = "/404", score, mylist, seen }) => (
    <div className="position-relative my-4">
        <Link href={url}>
            <a>
                <ImageCard
                    image={image}
                    width={400}
                    height={600}
                >
                    <Label>{title}</Label>
                </ImageCard>
            </a>
        </Link>
        <ScoreTag score={isNaN(score) ? 0 : score} />
        {mylist && <MyListTag />}
        {seen && <SeenTag />}
    </div>
);

PosterCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    score: PropTypes.number,
    mylist: PropTypes.bool,
    seen: PropTypes.bool
};

export default PosterCard;