import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import Layout from '../../components/layout/Layout';
import TvShowDetails from '../../components/tvshows/TvShowDetails';
import TvShowCast from '../../components/tvshows/TvShowCast';
import TvShowRecommendations from '../../components/tvshows/TvShowRecommendations';

import { getTvShow, clearState } from '../../actions/tvShowActions';
import { firebaseContext } from '../../firebase';

const TvShow = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Redux
    const language = useSelector(state => state.language.language);
    const tvShow = useSelector(state => state.tvShow.tvShow);

    // Firestore
    const { user } = useContext(firebaseContext);

    // Get Tv Show
    useEffect(() => {
        if (router.query.id) {
            dispatch(getTvShow(router.query.id, language));
        }
        return () => dispatch(clearState());
    }, [router, language]);

    return (
        <Layout description="TV show details">
            <h1 className="text-center w-100">
                {tvShow && tvShow.name || <Skeleton width={200}/>}
            </h1>
            <Tabs
                mountOnEnter
                defaultActiveKey="details"
                className="mt-4 text-center"
            >
                <Tab
                    tabClassName="xs-block"
                    eventKey="details"
                    title={t('Details')}
                >
                    <TvShowDetails />
                </Tab>
                <Tab
                    tabClassName="xs-block"
                    eventKey="cast"
                    title={t('Cast')}
                >
                    <TvShowCast />
                </Tab>
                <Tab
                    tabClassName="xs-block"
                    eventKey="recommendations"
                    title={t('Recommendations')}
                >
                    <TvShowRecommendations />
                </Tab>
            </Tabs>
        </Layout>
    );
}

export default TvShow;