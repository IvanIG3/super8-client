import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';
import PropTypes from 'prop-types';

const MoviesList = ({list}) => {
    return (
        <Row noGutters className="my-5" xs="2" sm="3" md="4" lg="5" xl="6">
            {list.map(item => (
                <Col key={item.id} className="mb-5">
                    <Link href={`/movies/${item.id}`}>
                        <a>
                            <ImageCard
                                className="position-relative"
                                title={item.title}
                                image={item.poster_path ?
                                    `https://image.tmdb.org/t/p/w500${item.poster_path}` :
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
};

MoviesList.propTypes = {
    list: PropTypes.arrayOf( PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
        title: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
        poster_path: PropTypes.string
    }))
};
 
export default MoviesList;