import React from 'react';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import LanguageSelector from '../ui/LanguageSelector';

const UserNav = () => {
    // Hooks
    const firebase = useFirebase();
    const { t } = useTranslation();
    const router = useRouter();

    // Redux
    const user = useSelector(state => state.firebase.profile);
    const logged = useSelector(state => !state.firebase.auth.isEmpty);

    // Login
    const login = () => {
        if(logged) {
            firebase.logout();
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
                    {user && user.name}
                </p>
                <Button
                    className="text-white"
                    variant="secondary"
                    type="submit"
                    size="sm"
                    onClick={ () => login() }
                >
                    {logged ? t("Logout") : t("Login")}
                </Button>
            </div>
        </div>
    );
}

export default UserNav;