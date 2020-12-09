import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SortButtons = ({ value, buttons, onChange }) => {
    return (
        <ToggleButtonGroup
            type="radio"
            name="sort-options"
            onChange={onChange}
            value={value}
            className="flex-wrap"
        >
            {buttons.map((button, idx) => (
                <ToggleButton
                    key={idx}
                    variant="secondary"
                    value={button.value}
                    className="d-inline-block text-nowrap text-truncate"
                >
                    {button.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

SortButtons.propTypes = {
    buttons: PropTypes.arrayOf( PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};
 
export default SortButtons;