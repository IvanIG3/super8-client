import React, { useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Layout from '../../components/layout/Layout';
import CollectionButtons from '../../components/ui/CollectionButtons';
import Paragraph from '../../components/ui/Paragraph';
import Poster from '../../components/ui/Poster';

import { getTvShow, clearState } from '../../actions/tvShowActions';
import { extractInfoTvShow } from '../../tmdb/extractInfo';
import { firebaseContext } from '../../firebase';

const TvShow = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Redux
    const language = useSelector(state => state.language.language);
    const tvShow = useSelector(state => state.tvShow.tvShow);
    const loading = useSelector(state => state.tvShow.loading);

    // Firestore
    const { user } = useContext(firebaseContext);

    // Get Tv Show
    useEffect(() => {
        if(router.query.id) {
            dispatch( getTvShow(router.query.id, language) );
        }
        return () => dispatch(clearState());
    }, [router, language]);

    return (
        <Layout>
            <h1 className="text-center w-100">{tvShow && tvShow.name}</h1>
            {loading &&
                <div className="text-center">
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                </div>
            }
            {!loading && tvShow &&
                <Row className="justify-content-center">
                    <Col className="d-flex flex-column mt-4 py-2" xs="12" sm="6" md="4">
                        <Poster posterPath={tvShow.poster_path ? 
                            `${process.env.tmdbImageURL}${tvShow.poster_path}` :
                            '/no-poster.png'}
                        />
                        {user && 
                            <CollectionButtons item={extractInfoTvShow(tvShow)}/>}
                    </Col>
                    <Col className="mt-4" xs="12" sm="6" md="8">
                        <Paragraph tag={t('Overview')} text={tvShow.overview}/>
                        <Paragraph tag={t('Score')} 
                            text={`${tvShow.vote_average * 10} / 100 (${tvShow.vote_count} ${t('votes')})`}/>
                        <Paragraph tag={t('Release Date')} text={tvShow.first_air_date}/>
                        <Paragraph tag={t('Seasons')} text={tvShow.seasons ? tvShow.seasons.length : 1}/>
                        <Paragraph tag={t('Genres')} 
                            text={tvShow.genres.map(genre => genre.name).join(', ')}/>
                    </Col>
                </Row>
            }
        </Layout>
    );
}
 
export default TvShow;