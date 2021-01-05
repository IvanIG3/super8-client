import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import ImageCard from '../ui/ImageCard';
import MyListTag from '../ui/MyListTag';
import SeenTag from '../ui/SeenTag';
import Label from '../ui/Label';

const PosterCard = ({ title, image, url = "/404", score, mylist, seen }) => {

    // Lazy load
    const DynamicScoreTag = dynamic(() => import('../ui/ScoreTag'));

    return (
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
            <DynamicScoreTag score={isNaN(score) ? 0 : score} />
            {mylist && <MyListTag />}
            {seen && <SeenTag />}
        </div>
    );
};

PosterCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    score: PropTypes.number,
    mylist: PropTypes.bool,
    seen: PropTypes.bool
};

export default PosterCard;