import React from 'react'

import { Dropdown, Button, ButtonGroup } from 'react-bootstrap'

const UserDropdown = ({ username, logout }) => {
    return (
        <Dropdown as={ButtonGroup}>
            <Button variant='info'>{username}</Button>
            <Dropdown.Toggle split variant='outline-light' id='dropdown-split-basic' />

            <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Salir</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserDropdown
