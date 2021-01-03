import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Components
import Layout from '../components/layout/Layout';
import LoginSuggestion from '../components/ui/LoginSuggestion';
import CollectionPage from '../components/collections/CollectionPage';

// Actions
import { firebaseContext } from '../firebase';

const SeenPage = () => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useContext(firebaseContext);

    // Redux
    const sortBy = useSelector(state => state.seen.sortBy);

    return (
        <Layout description="List of movies and tv shows seen by the user">
            <h1 className="text-center">
                {t('Seen')}
                {sortBy && ` - ${t(sortBy)}`}
            </h1>
            {!user ?
                <LoginSuggestion
                    placeholder={t("Login to see your list of movies and TV shows")}
                />
            :
                <CollectionPage collection="seen"/>
            }
        </Layout>
    );
}
 
export default SeenPage;