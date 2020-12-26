import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import MyListTag from '../ui/MyListTag';
import SeenTag from '../ui/SeenTag';

const ImageCardList = ({ items, mylist, seenlist }) => (
    <Row noGutters className="mt-5 w-100" xs="2" sm="3" md="4" lg="5">
        {items.length > 0 ?
            items.map(item => (
                <Col key={item.id} className="mb-5">
                    <Link href={item.url}>
                        <a>
                            <ImageCard
                                title={item.title.length > 50 ?
                                    item.title.substring(0, 50) + "..." :
                                    item.title
                                }
                                image={item.poster_path}
                            />
                        </a>
                    </Link>
                    <ScoreTag score={item.vote_average * 10}/>
                    {mylist && mylist.some(i => i.id === item.id) &&
                        <MyListTag />
                    }
                    {seenlist && seenlist.some(i => i.id === item.id) &&
                        <SeenTag />
                    }
                </Col>
            ))
        :
            <p className="text-center">
                {t("No results found")}
            </p>
        }
    </Row>
);

ImageCardList.propTypes = {
    items: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        url: PropTypes.string,
    })).isRequired,
    mylist: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
    })),
    seenlist: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
    })),
};
 
export default ImageCardList;