import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const LoginSuggestion = ({ placeholder }) => {
    
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <div className="d-flex flex-column align-items-center">
            <p className="mt-5 text-center">
                {placeholder}
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
        </div>
    )
};

LoginSuggestion.propTypes = {
    placeholder: PropTypes.string.isRequired
};
 
export default LoginSuggestion;