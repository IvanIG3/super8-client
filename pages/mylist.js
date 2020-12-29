import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Components
import Layout from '../components/layout/Layout';
import LoginSuggestion from '../components/ui/LoginSuggestion';
import CollectionPage from '../components/collections/CollectionPage';

// Actions
import { firebaseContext } from '../firebase';

const MyListPage = () => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useContext(firebaseContext);

    // Redux
    const sortBy = useSelector(state => state.mylist.sortBy);

    return (
        <Layout>
            <h1 className="text-center">
                {t('My List')}
                {sortBy && ` - ${t(sortBy)}`}
            </h1>
            {!user ?
                <LoginSuggestion
                    placeholder={t("Login to see your list of movies and TV shows")}
                />
            :
                <CollectionPage collection="mylist"/>
            }
        </Layout>
    );
}
 
export default MyListPage;