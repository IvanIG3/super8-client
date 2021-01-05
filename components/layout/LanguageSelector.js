import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FormControl } from 'react-bootstrap';
import { setLanguage } from '../../actions/languageActions';

const LanguageSelector = () => {
    // Translation hook
    const { i18n } = useTranslation();

    // Redux
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.language);

    // Change language
    const handleChange = e => {
        i18n.changeLanguage(e.target.value);
        dispatch(setLanguage(e.target.value));
    };

    return (
        <FormControl
            custom
            as="select"
            size="sm"
            value={language}
            onChange={handleChange}
            aria-label={language}
        >
            <option value="es-ES">ES</option>
            <option value="en-US">EN</option>
        </FormControl>
    );
}
 
export default LanguageSelector;