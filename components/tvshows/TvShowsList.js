import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import MyListTag from '../ui/MyListTag';
import SeenTag from '../ui/SeenTag';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const TvShowsList = () => {

    const list = useSelector(state => state.tvShows.tvShowsList);
    const [mylist] = useFirebaseUserCollection('mylist');
    const [seenlist] = useFirebaseUserCollection('seen');

    return (
        <Row noGutters className="mt-5 w-100" xs="2" sm="3" md="4" lg="5">
            {list.map(item => (
                <Col key={item.id} className="mb-5 position-relative">
                    <Link href={`/tvshows/${item.id}`}>
                        <a>
                            <ImageCard
                                title={item.name.length > 50 ?
                                    item.name.substring(0, 50) + "..." :
                                    item.name
                                }
                                image={item.poster_path ?
                                    `${process.env.tmdbImageURL}${item.poster_path}` :
                                    'no-poster.png'
                                }
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
            ))}
        </Row>
    );
};

TvShowsList.propTypes = {
    list: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
        name: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        poster_path: PropTypes.string
    }))
};
 
export default TvShowsList;