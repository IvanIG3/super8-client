import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2';
import PropTypes from 'prop-types';

const SearchForm = ({query, setQuery, placeholder}) => {
    // State
    const [ state, setState ] = useState(query);
    
    // Handlers
    const handleSubmit = e => {
        e.preventDefault();
        setQuery(state);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup style={{maxWidth: "300px"}}>
                <FormControl
                    placeholder={placeholder}
                    className="border border-secondary"
                    onChange={ e => setState(e.target.value) }
                    value={state}
                />
                <InputGroup.Append>
                    <Button type="submit" variant="secondary" className="py-0">
                        <SearchAlt2 style={{width: "1.3em"}}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </form>
    );
};

SearchForm.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default SearchForm;