import React from 'react';
import styled from 'styled-components';

const TextLogo = styled.h2`
    margin: 0;
    font-weight: bold;
    font-size: 1.3em;
    @media (min-width: 300px) {
        font-size: 1.5em;
    }
    &:hover {
        cursor: pointer;
    }
`;

const Logo = () => {
    return (
        <TextLogo
            className="text-secondary"
        >SUPER8</TextLogo>
    );
}

export default Logo;