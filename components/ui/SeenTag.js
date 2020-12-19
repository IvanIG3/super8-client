import React from 'react';
import styled from 'styled-components';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';

const Tag = styled(EyeFill)`
    position: absolute;
    height: 9%;
    right: 5%;
    top: -4.5%;
`;

const SeenTag = () => (
    <Tag className="text-info"/>
);
 
export default SeenTag;