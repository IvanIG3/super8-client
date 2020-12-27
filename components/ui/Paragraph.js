import React from 'react';

const Paragraph = ({ tag, text }) => {
    return (
        <p className="text-justify">
            {tag && <span className="text-primary">{tag}: </span>}
            {text}
        </p>
    );
}
 
export default Paragraph;