import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ImageCard from '../ui/ImageCard';
import ScoreTag from '../ui/ScoreTag';

const MoviesList = ({list}) => {
    return (
        <Row noGutters className="my-5" xs="2" sm="3" md="4" lg="5" xl="6">
            {list.map(item => (
                <Col key={item.id} className="mb-5">
                    <ImageCard
                        className="position-relative"
                        title={item.title}
                        image={item.poster_path ?
                            `https://image.tmdb.org/t/p/w500${item.poster_path}` :
                            'no-poster.png'
                        }
                    />
                    <ScoreTag score={item.vote_average * 10}/>
                </Col>
            ))}
        </Row>
    );
}
 
export default MoviesList;