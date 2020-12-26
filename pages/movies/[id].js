import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Layout from '../../components/layout/Layout';
import CollectionButtons from '../../components/ui/CollectionButtons';
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
                <div className="row justify-content-center">
                    <div className="d-flex flex-column mt-4 py-2 col-8 col-sm-6 col-md-4">
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
                            <CollectionButtons
                                item={extractInfoMovie(movie)}
                            />
                        }
                    </div>
                    <div className="mt-4 col-sm-6 col-md-8">
                        <p className="text-justify">
                            <span className="text-primary">{t('Overview')}: </span>
                            {movie.overview}
                        </p>
                        <p>
                            <span className="text-primary">{t('Score')}: </span>
                            {movie.vote_average * 10} / 100 ({movie.vote_count} {t('votes')})
                        </p>
                        <p>
                            <span className="text-primary">{t('Release Date')}: </span>
                            {movie.release_date}
                        </p>
                        <p>
                            <span className="text-primary">{t('Runtime')}: </span>
                            {new Date(movie.runtime * 60 * 1000).toISOString().substr(11, 8)}
                        </p>
                        <p>
                            <span className="text-primary">{t('Genres')}: </span>
                            {movie.genres.map(genre => genre.name).join(', ')}
                        </p>
                    </div>
                </div>
            }
        </Layout>
    );
}
 
export default Movie;