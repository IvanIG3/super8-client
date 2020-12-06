import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SortButtons = ({ buttonsData, sortby, sortFn }) => {
    return (
        <ButtonGroup toggle className="flex-wrap">
            {buttonsData.map((button, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={button.value}
                    checked={sortby === button.value}
                    onChange={e => sortFn(e.currentTarget.value)}
                    className="d-inline-block text-nowrap text-truncate"
                >
                    {button.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
};

SortButtons.propTypes = {
    buttonsData: PropTypes.arrayOf( PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
    sortby: PropTypes.string.isRequired,
    sortFn: PropTypes.func.isRequired
};
 
export default SortButtons;