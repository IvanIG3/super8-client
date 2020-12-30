import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import CollectionButtons from '../../components/ui/CollectionButtons';
import Paragraph from '../../components/ui/Paragraph';

import { extractInfoMovie } from '../../tmdb/extractInfo';
import { firebaseContext } from '../../firebase';

const MovieDetails = () => {

    // Hooks
    const { t } = useTranslation();

    // Firestore
    const { user } = useContext(firebaseContext);

    // Redux
    const movie = useSelector(state => state.movie.movie);

    return (
        <Row className="justify-content-center">
            <Col className="d-flex flex-column mt-4 py-2" xs="12" sm="6" md="4">
                <Image
                    className="border rounded-lg border-dark"
                    src={movie.poster_path ? 
                        `${process.env.tmdbImageURL}${movie.poster_path}` :
                        '/no-poster.png'}
                    width={500}
                    height={750}
                />
                {user && 
                    <CollectionButtons item={extractInfoMovie(movie)}/>}
            </Col>
            <Col className="mt-4" xs="12" sm="6" md="8">
                <Paragraph tag={t('Type')} text={t('movie')}/>
                <Paragraph tag={t('Overview')} text={movie.overview}/>
                <Paragraph tag={t('Score')} 
                    text={`${movie.vote_average * 10} / 100 (${movie.vote_count} ${t('votes')})`}/>
                <Paragraph tag={t('Release Date')} text={movie.release_date}/>
                <Paragraph tag={t('Runtime')} 
                    text={new Date(movie.runtime * 60 * 1000).toISOString().substr(11, 8)}/>
                <Paragraph tag={t('Genres')} 
                    text={movie.genres.map(genre => genre.name).join(', ')}/>
            </Col>
        </Row>
    );
}
 
export default MovieDetails;