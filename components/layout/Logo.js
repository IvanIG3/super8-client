import React from 'react';
import styled from 'styled-components';

const TextLogo = styled.p`
    margin: 0;
    font-family: 'Rammetto One';
    font-size: 1em;
    @media (min-width: 300px) {
        font-size: 1.3em;
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