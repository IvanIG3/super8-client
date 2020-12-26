import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Components
import Layout from '../components/layout/Layout';
import LoginSuggestion from '../components/ui/LoginSuggestion';
import CollectionPage from '../components/collections/CollectionPage';

// Actions
import { firebaseContext } from '../firebase';
import useFirebaseUserCollection from '../hooks/useFirebaseUserCollection';

const FavoritesPage = () => {
    // Hooks
    const { t } = useTranslation();
    const { user } = useContext(firebaseContext);
    const [ favorites ] = useFirebaseUserCollection('favorites');

    // Redux
    const sortBy = useSelector(state => state.favorites.sortBy);

    return (
        <Layout>
            <h1 className="text-center">
                {t('Favorites')}
                {sortBy && ` - ${t(sortBy)}`}
            </h1>
            {!user ?
                <LoginSuggestion
                    placeholder={t("Login to see your list of movies and TV shows")}
                />
            :
                <CollectionPage
                    collectionList={favorites}
                    reducer="favorites"
                />
            }
        </Layout>
    );
}
 
export default FavoritesPage;