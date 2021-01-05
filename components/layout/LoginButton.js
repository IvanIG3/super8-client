import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Fingerprint } from '@styled-icons/fa-solid/Fingerprint';

import { removeCollections } from '../../actions/collectionActions';
import { firebaseContext } from '../../firebase';
import ToggleButton from '../ui/ToggleButton';

const LoginButton = () => {

    // Hooks
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

    // Firebase
    const { user, auth } = useContext(firebaseContext);

    // Auth functions
    const login = () => router.push('/login');
    const logout = () => {
        auth.signOut();
        dispatch(removeCollections());
    };


    return (
        <div className="d-flex flex-wrap align-items-center">
            <p className="my-0 mr-3">
                {user && user.displayName}
            </p>
            <ToggleButton
                name={t("Login")}
                altName={t("Logout")}
                size="sm"
                checked={user !== null}
                onCheck={login}
                onUncheck={logout}
                Icon={Fingerprint}
            />
        </div>
    );
}

export default LoginButton;