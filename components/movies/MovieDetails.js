import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CollectionButtons from '../../components/ui/CollectionButtons';
import Paragraph from '../../components/ui/Paragraph';
import Label from '../../components/ui/Label';
import ImageCard from '../../components/ui/ImageCard';

import { movieSelector } from '../../selectors/movieSelectors';
import { firebaseContext } from '../../firebase';

const MovieDetails = () => {

    // Hooks
    const { t } = useTranslation();

    // Firestore
    const { user } = useContext(firebaseContext);

    // Redux
    const movie = useSelector(movieSelector);

    return (
        <Row className="justify-content-center">
            <Col className="d-flex flex-column mt-4 py-2" xs="12" sm="6" md="4">
                <ImageCard
                    image={movie.poster_path}
                    width={500}
                    height={750}
                >
                    <CollectionButtons item={movie} logged={user != null}/>
                </ImageCard>
            </Col>
            <Col className="mt-4 text-justify" xs="12" sm="6" md="8">
                <Label>{t('Type')}</Label>
                <Paragraph>{t('movie')}</Paragraph>
                <Label>{t('Overview')}</Label>
                <Paragraph count={5}>{movie.overview}</Paragraph>
                <Label>{t('Score')}</Label>
                <Paragraph>{movie.score}</Paragraph>
                <Label>{t('Release Date')}</Label>
                <Paragraph>{movie.release_date}</Paragraph>
                <Label>{t('Runtime')}</Label>
                <Paragraph>{movie.runtime}</Paragraph>
                <Label>{t('Genres')}</Label>
                <Paragraph>{movie.genres}</Paragraph>
            </Col>
        </Row>
    );
}
 
export default MovieDetails;