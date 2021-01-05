import React from 'react';
import LanguageSelector from './LanguageSelector';
import LoginButton from './LoginButton';

const UserNav = () => (
    <div 
        className="d-flex flex-wrap justify-content-between align-items-center"
        style={{ height: "40px"}}
    >
        <div style={{ width: "60px" }}>
            <LanguageSelector />
        </div>
        <LoginButton />
    </div>
);

export default UserNav;