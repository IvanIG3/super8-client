import React, { useEffect, useContext }  from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Layout from '../../components/layout/Layout';
import CollectionButtons from '../../components/ui/CollectionButtons';
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
                <div className="row justify-content-center">
                    <div className="d-flex flex-column mt-4 py-2 col-8 col-sm-6 col-md-4">
                        <Image
                            fluid rounded thumbnail
                            className="border-light"
                            src={
                                tvShow.poster_path ?
                                    `${process.env.tmdbImageURL}${tvShow.poster_path}` :
                                    'no-poster.png'
                            }
                            alt={tvShow.name}
                        />
                        {user && 
                            <CollectionButtons
                                item={extractInfoTvShow(tvShow)}
                            />
                        }
                    </div>
                    <div className="mt-4 col-sm-6 col-md-8">
                        <p className="text-justify">
                            <span className="text-primary">{t('Overview')}: </span>
                            {tvShow.overview}
                        </p>
                        <p>
                            <span className="text-primary">{t('Score')}: </span>
                            {tvShow.vote_average * 10} / 100 ({tvShow.vote_count} {t('votes')})
                        </p>
                        <p>
                            <span className="text-primary">{t('Release Date')}: </span>
                            {tvShow.first_air_date}
                        </p>
                        <p>
                            <span className="text-primary">{t('Seasons')}: </span>
                            {tvShow.seasons ? tvShow.seasons.length : 1}
                        </p>
                        <p>
                            <span className="text-primary">{t('Genres')}: </span>
                            {tvShow.genres.map(genre => genre.name).join(', ')}
                        </p>
                    </div>
                </div>
            }
        </Layout>
    );
}
 
export default TvShow;