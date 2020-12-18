import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

// Components
import Layout from '../components/layout/Layout';
import MyList from '../components/mylist/MyList';

const MyListPage = () => {
    // Hooks
    const { t } = useTranslation();
    const router = useRouter();

    // Redux
    const uid = useSelector(state => state.firebase.auth.uid);

    return (
        <Layout>
            <h1 className="text-center">{t('My List')}</h1>
            <div className="d-flex flex-column align-items-center">
                {uid ?
                    <MyList />
                :
                    <>
                        <p className="mt-3">
                            {t("Login to see your list of movies and TV shows")}
                        </p>
                        <Button
                            className="mt-3"
                            variant="secondary"
                            type="submit"
                            size="sm"
                            onClick={ () => router.push('/login') }
                        >
                            {t("Login")}
                        </Button>
                    </>
                }
            </div>
        </Layout>
    );
}

export default MyListPage;