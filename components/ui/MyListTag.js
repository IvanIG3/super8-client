import React from 'react';
import styled from 'styled-components';
import { BookmarkCheckFill } from '@styled-icons/bootstrap/BookmarkCheckFill';

const Tag = styled(BookmarkCheckFill)`
    position: absolute;
    height: 7%;
    left: 5%;
    top: -4%;
`;

const MyListTag = () => (
    <Tag className="text-danger"/>
)

export default MyListTag;