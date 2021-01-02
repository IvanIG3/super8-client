import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CollectionButtons from '../../components/ui/CollectionButtons';
import Paragraph from '../../components/ui/Paragraph';
import Label from '../../components/ui/Label';
import ImageCard from '../../components/ui/ImageCard';

import { tvShowSelector } from '../../selectors/tvShowSelectors';
import { firebaseContext } from '../../firebase';

const TvShowDetails = () => {

    // Hooks
    const { t } = useTranslation();

    // Firestore
    const { user } = useContext(firebaseContext);

    // Redux
    const tvShow = useSelector(tvShowSelector);

    return (
        <Row className="justify-content-center">
            <Col className="d-flex flex-column mt-4 py-2" xs="12" sm="6" md="4">
                <ImageCard
                    image={tvShow.poster_path}
                    width={500}
                    height={750}
                >
                    <CollectionButtons item={tvShow} logged={user != null}/>
                </ImageCard>
            </Col>
            <Col className="mt-4 text-justify" xs="12" sm="6" md="8">
                <Label>{t('Type')}</Label>
                <Paragraph>{t('tvshow')}</Paragraph>
                <Label>{t('Overview')}</Label>
                <Paragraph count={5}>{tvShow.overview}</Paragraph>
                <Label>{t('Score')}</Label>
                <Paragraph>{tvShow.score}</Paragraph>
                <Label>{t('Release Date')}</Label>
                <Paragraph>{tvShow.first_air_date}</Paragraph>
                <Label>{t('Seasons')}</Label>
                <Paragraph>{tvShow.seasons}</Paragraph>
                <Label>{t('Genres')}</Label>
                <Paragraph>{tvShow.genres}</Paragraph>
            </Col>
        </Row>
    );
}
 
export default TvShowDetails;