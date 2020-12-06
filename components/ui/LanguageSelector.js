import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { setLanguage } from '../../actions/languageActions';

const LanguageSelector = () => {
    // Translation hook
    const { i18n } = useTranslation();

    // Redux
    const dispatch = useDispatch();
    const language = useSelector(state => state.movies.language);

    // Change language
    const handleChange = e => {
        i18n.changeLanguage(e.target.value);
        dispatch(setLanguage(e.target.value));
    };

    return (
        <Form.Control
            custom
            as="select"
            size="sm"
            value={language}
            onChange={handleChange}
        >
            <option value="es-ES">ES</option>
            <option value="en-US">EN</option>
        </Form.Control>
    );
}
 
export default LanguageSelector;