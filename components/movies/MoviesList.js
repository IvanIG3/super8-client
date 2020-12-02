import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { discoverMovies } from '../../actions/moviesActions';

// Styles
const CardImg = styled(Card.Img)`
    max-width: 150px;
    @media (min-width: 470px) {
        max-width: 200px;
    }
`;

const CardTitle = styled(Card.Title)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
    @media (min-width: 470px) {
        max-width: 150px;
    }
`;

const Vote = styled.p`
    position: absolute;
    margin: 0;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    font-size: 25px;
    left: calc(50% - 20px);
    top: -20px;
    background-color: black;
    color: ${props => 
        props.value >= 80 ? "#00c845" :
        props.value >= 65 ? "#f7f332" :
        props.value >= 50 ? "#ff8300" :
        "#bd2323"
    };
`;

// Movies List
const MoviesList = () => {
    // Redux
    const dispatch = useDispatch();
    const moviesList = useSelector(state => state.movies.moviesList);
    const sort_by = useSelector(state => state.movies.sortBy);
    const page = useSelector(state => state.movies.page);

    // Get movies
    useEffect(() => 
        dispatch(discoverMovies({sort_by, page})),
        [sort_by, page]
    );

    return (
        <div className="justify-content-center row my-5">
            {moviesList.map(m => (
                <div
                    key={m.id}
                    className="mb-5 col-auto px-0 col-offset-1"
                >
                    <Card bg="primary" text="secondary" key={m.id}>
                        <CardImg
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                            className="position-relative"
                        />
                        <Vote value={m.vote_average * 10}>
                            {m.vote_average * 10}
                        </Vote>
                        <Card.Body className="py-2 text-center">
                            <CardTitle className="font-weight-bold">
                                {m.title}
                            </CardTitle>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
}
 
export default MoviesList;