import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { SearchAlt2 } from '@styled-icons/boxicons-regular/SearchAlt2';
import styled from 'styled-components';

const SearchIcon = styled(SearchAlt2)`
    width: 1.5em;
`;

const Search = () => {
    return (
        <Navbar collapseOnSelect expand="sm" className="d-inline-block">
            <Navbar.Toggle className="mr-auto mr-3 mb-3 border-secondary">
                <SearchIcon className="text-secondary"/>
            </Navbar.Toggle>
            <Navbar.Collapse>
                <Form>
                    <div className="d-flex">
                        <FormControl
                            type="text"
                            placeholder="Search..."
                            className="mr-1"
                        />
                        <Button variant="secondary">Search</Button>
                    </div>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
 
export default Search;