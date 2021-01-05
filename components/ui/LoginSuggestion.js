import React from 'react';
import PropTypes from 'prop-types';
import LoginButton from '../layout/LoginButton';

const LoginSuggestion = ({ placeholder }) =>  (
    <div className="d-flex flex-column align-items-center">
        <p className="mt-5 text-center">
            {placeholder}
        </p>
        <LoginButton />
    </div>
)

LoginSuggestion.propTypes = {
    placeholder: PropTypes.string.isRequired
};
 
export default LoginSuggestion;