import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const SortButtons = ({ buttonsData, sortby, sortFn }) => {
    return (
        <ButtonGroup toggle>
            {buttonsData.map((button, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={button.value}
                    checked={sortby === button.value}
                    onChange={e => sortFn(e.currentTarget.value)}
                >
                    {button.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    );
}
 
export default SortButtons;