import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Github } from '@styled-icons/boxicons-logos/Github';


const FooterContainer = styled(Container)`
    border-top: 1px solid #839496;
    padding: 15px 0;
    margin-top: 30px;
`;

const Reference = styled.a`
    display: flex;
    text-align: center;
    margin: 10px 0;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    p {
        margin: 0 0 0 5px;
    }
`;

const GithubIcon = styled(Github)`
    width: 1em;
`;

const Footer = () => {
    return (
        <footer>
            <FooterContainer>
                <Reference 
                    href="https://github.com/IvanIG3"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Designed & developed by IvanIG3
                </Reference>
                <Reference
                    href="https://github.com/IvanIG3/super8-client"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GithubIcon />
                    <p>View Code</p>
                </Reference>
            </FooterContainer>
        </footer>
    );
}
 
export default Footer;