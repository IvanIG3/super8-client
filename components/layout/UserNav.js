import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import LanguageSelector from '../ui/LanguageSelector';
import { removeCollections } from '../../actions/collectionActions';
import { firebaseContext } from '../../firebase';

const UserNav = () => {
    // Hooks
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

    // Firebase
    const { user, auth } = useContext(firebaseContext);

    // Login
    const login = () => {
        if(user) {
            auth.signOut();
            dispatch( removeCollections() );
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div
                style={{ width: "4em" }}
            >
                <LanguageSelector />
            </div>
            <div className="d-flex flex-wrap align-items-center">
                <p className="my-0 mr-3">
                    {user && user.displayName}
                </p>
                <Button
                    variant="secondary"
                    type="submit"
                    size="sm"
                    onClick={ () => login() }
                >
                    {user ? t("Logout") : t("Login")}
                </Button>
            </div>
        </div>
    );
}

export default UserNav;