import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2';

const SearchForm = ({onSubmit, placeholder}) => {
    // State
    const [ query, setQuery ] = useState('');
    // Handlers
    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup style={{maxWidth: "300px"}}>
                <FormControl
                    placeholder={placeholder}
                    className="border border-secondary"
                    onChange={ e => setQuery(e.target.value) }
                />
                <InputGroup.Append>
                    <Button type="submit" variant="secondary" className="py-0">
                        <SearchAlt2 style={{width: "1.3em"}}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </form>
    );
}

export default SearchForm;