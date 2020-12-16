import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const MyList = () => {

    const [items] = useFirebaseUserCollection('mylist');

    return (
        <Row noGutters className="mt-5 w-100" xs="2" sm="3" md="4" lg="5">
            {items && items.map(item => (
                <Col key={item.id} className="mb-5 position-relative">
                    <Link href={`/${item.type}/${item.id}`}>
                        <a>
                            <ImageCard
                                title={item.title.length > 50 ?
                                    item.title.substring(0, 50) + "..." :
                                    item.title
                                }
                                image={item.poster_path ?
                                    `${process.env.tmdbImageURL}${item.poster_path}` :
                                    'no-poster.png'
                                }
                            />
                        </a>
                    </Link>
                    <ScoreTag score={item.vote_average * 10}/>
                </Col>
            ))}
        </Row>
    );
}

MyList.propTypes = {
    list: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        type: PropTypes.string.isRequired,
    }))
};

export default MyList;