import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import CollectionButtons from '../../components/ui/CollectionButtons';
import Paragraph from '../../components/ui/Paragraph';

import { extractInfoTvShow } from '../../tmdb/extractInfo';
import { firebaseContext } from '../../firebase';

const TvShowDetails = () => {

    // Hooks
    const { t } = useTranslation();

    // Firestore
    const { user } = useContext(firebaseContext);

    // Redux
    const tvShow = useSelector(state => state.tvShow.tvShow);

    return (
        <Row className="justify-content-center">
            <Col className="d-flex flex-column mt-4 py-2" xs="12" sm="6" md="4">
                <Image
                    className="img-thumbnail border-light rounded"
                    src={tvShow.poster_path ? 
                        `${process.env.tmdbImageURL}${tvShow.poster_path}` :
                        '/no-poster.png'}
                    width={500}
                    height={750}
                />
                {user && 
                    <CollectionButtons item={extractInfoTvShow(tvShow)}/>}
            </Col>
                <Col className="mt-4" xs="12" sm="6" md="8">
                    <Paragraph tag={t('Type')} text={t('tvshow')}/>
                    <Paragraph tag={t('Overview')} text={tvShow.overview}/>
                    <Paragraph tag={t('Score')} 
                        text={`${tvShow.vote_average * 10} / 100 (${tvShow.vote_count} ${t('votes')})`}/>
                    <Paragraph tag={t('Release Date')} text={tvShow.first_air_date}/>
                    <Paragraph tag={t('Seasons')} text={tvShow.seasons ? tvShow.seasons.length : 1}/>
                    <Paragraph tag={t('Genres')} 
                        text={tvShow.genres.map(genre => genre.name).join(', ')}/>
                </Col>
        </Row>
    );
}
 
export default TvShowDetails;