import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import MyListTag from '../ui/MyListTag';
import SeenTag from '../ui/SeenTag';

const PosterCard = ({ title, image, url="/404", score, mylist, seen }) => (
    <div className="position-relative my-4">
        <Link href={url}>
            <a>
                <ImageCard
                    title={title}
                    image={image}
                    width={400}
                    height={600}
                />
            </a>
        </Link>
        <ScoreTag score={isNaN(score) ? 0 : score}/>
        {mylist &&
            <MyListTag />
        }
        {seen &&
            <SeenTag />
        }
    </div>
);

PosterCard.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    score: PropTypes.number,
    mylist: PropTypes.bool,
    seen: PropTypes.bool,
    loading: PropTypes.bool,
};
 
export default PosterCard;