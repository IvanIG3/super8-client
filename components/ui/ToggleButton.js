import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ToggleButton = ({
    className = "",
    checked,
    name,
    altName,
    onCheck,
    onUncheck,
    Icon,
    size
}) => (
    <Button
        className={className}
        type="button"
        variant={checked ? "secondary" : "primary"}
        size={size}
        onClick={() => checked ? onUncheck() : onCheck()}
    >
        <>
            {Icon && <Icon style={{ width: "1em" }} className="mr-1 pb-1" />}
            {checked && altName ? altName : name}
        </>
    </Button>
);

ToggleButton.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    altName: PropTypes.string,
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func,
    Icon: PropTypes.object,
    size: PropTypes.string,
};

export default ToggleButton;