import React, { useState, useEffect }  from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Image, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BookmarkCheckFill } from '@styled-icons/bootstrap/BookmarkCheckFill';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';

import Layout from '../../components/layout/Layout';
import { getTvShow, clearState } from '../../actions/tvShowActions';
import useFirebaseUserCollection from '../../hooks/useFirebaseUserCollection';

const TvShow = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Redux
    const language = useSelector(state => state.language.language);
    const tvShow = useSelector(state => state.tvShow.tvShow);
    const loading = useSelector(state => state.tvShow.loading);
    const uid = useSelector(state => state.firebase.auth.uid);

    // Firestore
    const [ mylist, addToMyList, removeFromMyList ] = useFirebaseUserCollection('mylist');
    const [ seenlist, addToSeen, removeFromSeen ] = useFirebaseUserCollection('seen');

    // Get Tv Show
    useEffect(() => {
        if(router.query.id) {
            dispatch( getTvShow(router.query.id, language) );
        }
        return () => dispatch(clearState());
    }, [router, language]);

    // Check if in my list
    const inMyList = tvShow && mylist && mylist.some(item => item.id === tvShow.id);
    const inSeenList = tvShow && seenlist && seenlist.some(item => item.id === tvShow.id);

    // TvShow item for firebase
    const createItem = () => ({
        id: tvShow.id,
        title: tvShow.name,
        vote_average: tvShow.vote_average,
        poster_path: tvShow.poster_path,
        overview: tvShow.overview,
        backdrop_path: tvShow.backdrop_path,
        type: 'tvshows'
    });

    // Handlers
    const handleMyListButton = () => {
        if(inMyList) {
            removeFromMyList(tvShow.id);
        } else {
            addToMyList(tvShow.id, createItem());
        }
    };

    const handleSeenButton = () => {
        if(inSeenList) {
            removeFromSeen(tvShow.id);
        } else {
            addToSeen(tvShow.id, createItem());
        }
    };

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
                            src={`${process.env.tmdbImageURL}${tvShow.poster_path}`}
                            alt={tvShow.name}
                        />
                        {uid && 
                            <>
                                <Button
                                    className="mt-2"
                                    type="button"
                                    variant={inMyList ? "danger" : "success"}
                                    onClick={handleMyListButton}
                                >
                                    <>
                                        <BookmarkCheckFill style={{ width: "1em"}} className="mr-1 pb-1"/>
                                        {inMyList ? t('Remove from My List') : t('Add to My List')}
                                    </>
                                </Button>
                                <Button
                                    className="mt-1"
                                    type="button"
                                    variant={inSeenList ? "danger" : "success"}
                                    onClick={handleSeenButton}
                                >
                                    <>
                                        <EyeFill style={{ width: "1.1em"}} className="mr-1 pb-1" />
                                        {inSeenList ? t('Unmark as seen') : t('Mark as seen')}
                                    </>
                                </Button>
                            </>
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