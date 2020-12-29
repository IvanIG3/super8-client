import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import MyListTag from '../ui/MyListTag';
import SeenTag from '../ui/SeenTag';

const PosterCard = ({ title, image, url, score, mylist, seen }) => (
    <div className="position-relative my-4">
        <Link href={url}>
            <a>
                <ImageCard
                    title={title && title.length > 50 ? `${title.substring(0, 50)}...` : title}
                    image={image}
                />
            </a>
        </Link>
        {score &&
            <ScoreTag score={score}/>
        }
        {mylist &&
            <MyListTag />
        }
        {seen &&
            <SeenTag />
        }
    </div>
);

PosterCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string,
    score: PropTypes.number,
    mylist: PropTypes.bool,
    seen: PropTypes.bool
};
 
export default PosterCard;