import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2';
import styled from 'styled-components';

const SearchIcon = styled(SearchAlt2)`
    width: 1.3em;
`;

const SearchInput = styled(InputGroup)`
    max-width: 300px;
`;

const SearchForm = () => {
    return (
        <SearchInput>
            <FormControl placeholder="..." className="border border-secondary"/>
            <InputGroup.Append>
                <Button variant="secondary" className="py-0">
                    <SearchIcon />
                </Button>
            </InputGroup.Append>
        </SearchInput>
    );
}

export default SearchForm;