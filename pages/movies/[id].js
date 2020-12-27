import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Layout from '../../components/layout/Layout';
import CollectionButtons from '../../components/ui/CollectionButtons';
import Paragraph from '../../components/ui/Paragraph';

import { getMovie, clearState } from '../../actions/movieActions';
import { extractInfoMovie } from '../../tmdb/extractInfo';
import { firebaseContext } from '../../firebase';

const Movie = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Redux
    const language = useSelector(state => state.language.language);
    const movie = useSelector(state => state.movie.movie);
    const loading = useSelector(state => state.movie.loading);

    // Firestore
    const { user } = useContext(firebaseContext);
    
    // Get movie
    useEffect(() => {
        if(router.query.id) {
            dispatch( getMovie(router.query.id, language) );
        }
        return () => dispatch(clearState());
    }, [router, language]);
    
    return (
        <Layout>
            <h1 className="text-center w-100">{movie && movie.title}</h1>
            {loading &&
                <div className="text-center">
                    <Spinner
                        className="my-5"
                        animation="border"
                        variant="secondary"
                    />
                </div>
            }
            {!loading && movie &&
                <Row className="justify-content-center">
                    <Col className="d-flex flex-column mt-4 py-2" xs="12" sm="6" md="4">
                        <Image
                            fluid rounded thumbnail
                            className="border-light"
                            src={
                                movie.poster_path ? 
                                    `${process.env.tmdbImageURL}${movie.poster_path}` :
                                    '/no-poster.png'
                            }
                            alt={movie.title}
                        />
                        {user && 
                            <CollectionButtons item={extractInfoMovie(movie)}/>}
                    </Col>
                    <Col className="mt-4" xs="12" sm="6" md="8">
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
            }
        </Layout>
    );
}
 
export default Movie;