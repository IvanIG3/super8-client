import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavText = styled.p`
    font-weight: bold;
    font-size: 1.2em;
    margin: 0;
`;

const NavLink = ({ href, children }) => {
    const router = useRouter();
    const active = router.pathname === href ? 
        "border-bottom border-secondary border-2" : "";
    return (
        <Link href={href}>
            <Nav.Link href={href} className="mx-2">
                <NavText className={`text-secondary ${active}`}>
                    {children}
                </NavText>
            </Nav.Link>
        </Link>
    );
};

NavLink.propTypes = {
    href: PropTypes.string.isRequired
};

export default NavLink;