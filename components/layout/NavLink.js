import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';

const NavText = styled.p`
    margin: 0;
    font-family: 'Rammetto One';
`;

const NavLink = ({ href, children }) => {
    const router = useRouter();
    const active = router.pathname === href ? 
        "border-bottom border-secondary border-3" : "";
    return (
        <Link href={href}>
            <Nav.Link href={href} className="mx-2">
                <NavText className={`text-secondary ${active}`}>
                    {children}
                </NavText>
            </Nav.Link>
        </Link>
    );
}

export default NavLink;