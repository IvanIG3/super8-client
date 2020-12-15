import React from 'react';
import { useTranslation } from 'react-i18next';

// Components
import Layout from '../components/layout/Layout';
import MyList from '../components/mylist/MyList';

const MyListPage = () => {
    // Hooks
    const { t } = useTranslation();

    return (
        <Layout>
            <h1 className="text-center">{t('My List')}</h1>
            <div className="d-flex flex-column align-items-center">
                <MyList />
            </div>
        </Layout>
    );
}

export default MyListPage;