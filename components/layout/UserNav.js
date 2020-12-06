import React from 'react';
import LanguageSelector from '../ui/LanguageSelector';

const UserNav = () => {
    return (
        <div className="d-flex justify-content-end align-items-center mb-4">
            <p className="my-0 mx-3">
                TheUserName
            </p>
            <div style={{width: "4em"}}>
                <LanguageSelector />
            </div>
        </div>
    );
}
 
export default UserNav;