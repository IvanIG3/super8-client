import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconButton = styled.div`
    display: flex;
    span {
        display: none;
        @media (min-width: 768px) {
            display: inline-block;
            margin-left: 5px;
        }
    }
`;

const SortButtons = ({ value, buttons, onChange }) => {
    return (
        <ToggleButtonGroup
            type="radio"
            name="sort-options"
            onChange={onChange}
            value={value}
            className="my-3"
        >
            {buttons.map((button, idx) => (
                <ToggleButton
                    key={idx}
                    variant="secondary"
                    value={button.value}
                    className="d-inline-block text-nowrap"
                    aria-label={button.name}
                >
                    {button.icon}
                    <span className="ml-1 d-none d-md-inline-block">{button.name}</span>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};

SortButtons.propTypes = {
    buttons: PropTypes.arrayOf( PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        icon: PropTypes.object.isRequired
    })),
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};
 
export default SortButtons;