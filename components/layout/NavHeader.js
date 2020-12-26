import React from 'react';
import Link from 'next/link';
import { Navbar, Nav } from 'react-bootstrap';
import { ThMenu } from '@styled-icons/typicons/ThMenu';
import Logo from './Logo';
import NavLink from './NavLink';
import { useTranslation } from 'react-i18next';

const NavHeader = () => {
    // Translation
    const { t } = useTranslation();

    return (
        <Navbar collapseOnSelect expand="md">
            <Link href="/">
                <Navbar.Brand href="/">
                    <Logo />
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle className="border-primary border-2 text-primary">
                <ThMenu style={{width: "1em"}}/>
            </Navbar.Toggle>
            <Navbar.Collapse>
                <Nav className="justify-content-end flex-1">
                    <NavLink href="/movies">{t('Movies')}</NavLink>
                    <NavLink href="/tvshows">{t('TV Shows')}</NavLink>
                    <NavLink href="/mylist">{t('My List')}</NavLink>
                    <NavLink href="/seen">{t('Seen')}</NavLink>
                    <NavLink href="/favorites">{t('Favorites')}</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavHeader;