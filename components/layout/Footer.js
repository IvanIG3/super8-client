import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Github } from '@styled-icons/boxicons-logos/Github';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #839496;
    padding: 15px 0;
    margin-top: 30px;
    position: relative;
`;

const Reference = styled.a`
    display: flex;
    margin: 10px 0;
    font-size: 1rem;
    span {
        margin-left: 5px;
    }
`;

const TmdbLogo = styled.a`
    width: 80px;
    bottom: 25px;
    right: 0px;
    margin-top: 20px;
    @media (min-width: 600px) {
        position: absolute;
    }
`;

const Footer = () => {

    // Translation
    const { t } = useTranslation();

    return (
        <footer>
            <FooterContainer>
                <Reference 
                    href="https://github.com/IvanIG3"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('Designed & developed by IvanIG3')}
                </Reference>
                <Reference
                    href="https://github.com/IvanIG3/super8-client"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github style={{width: "1em"}}/>
                    <span>{t('View Code')}</span>
                </Reference>
                <TmdbLogo 
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/tmdb.svg" alt="Logo TMDB"/>
                </TmdbLogo>
            </FooterContainer>
            
        </footer>
    );
}
 
export default Footer;