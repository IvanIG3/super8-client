import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Layout from '../../components/layout/Layout';
import TvShowDetails from '../../components/tvshows/TvShowDetails';

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
    const loading = useSelector(state => state.tvShow.loading);

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
                <Tabs defaultActiveKey="details" className="mt-4">
                    <Tab
                        tabClassName="xs-block"
                        eventKey="details"
                        title={t('Details')}
                    >
                        <TvShowDetails />
                    </Tab>
                </Tabs>
            }
        </Layout>
    );
}

export default TvShow;