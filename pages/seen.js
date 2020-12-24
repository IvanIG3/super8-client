import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

import Layout from '../components/layout/Layout';
import SeenList from '../components/seen/SeenList';
import SearchForm from '../components/ui/SearchForm';
import useFirebaseUserCollection from '../hooks/useFirebaseUserCollection';
import { firebaseContext } from '../firebase';

const Seen = () => {
    // Hooks
    const { t } = useTranslation();
    const router = useRouter();
    const [ items ] = useFirebaseUserCollection('seen');
    const { user } = useContext(firebaseContext);

    // State
    const [ query, setQuery ] = useState('');

    // Filter items from my list
    const filterItems = () => {
        if(!query) {
            return items;
        } else if(items) {
            const q = query.toLowerCase();
            return items.filter(item => item.title.toLowerCase().includes(q));
        } else {
            return null;
        }
    };

    return (
        <Layout>
            <h1 className="text-center">{t('Seen')}</h1>
            <div className="d-flex flex-column align-items-center">
                <div className="my-3">
                    <SearchForm
                        query={query}
                        setQuery={setQuery}
                        placeholder={t('Search for the title...')}
                    />
                </div>
                <div className="d-flex flex-column align-items-center">
                    {user ?
                        <SeenList items={filterItems()}/>
                    :
                        <>
                            <p className="mt-5 text-center">
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
            </div>
        </Layout>
    );
}
 
export default Seen;
