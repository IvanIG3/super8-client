import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

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
}
 
export default SortButtons;