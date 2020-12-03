import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2';
import styled from 'styled-components';

const SearchIcon = styled(SearchAlt2)`
    width: 1.3em;
`;

const SearchInput = styled(InputGroup)`
    max-width: 300px;
`;

const SearchForm = ({onSubmit}) => {

    const [ query, setQuery ] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <SearchInput>
                <FormControl
                    placeholder="..."
                    className="border border-secondary"
                    onChange={ e => setQuery(e.target.value) }
                />
                <InputGroup.Append>
                    <Button type="submit" variant="secondary" className="py-0">
                        <SearchIcon />
                    </Button>
                </InputGroup.Append>
            </SearchInput>
        </form>
    );
}

export default SearchForm;