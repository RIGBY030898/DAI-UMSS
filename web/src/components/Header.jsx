import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import { agentRoute, createAgentRoute } from '../constants'
import { UserDropdown } from '.'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.getUser = this.getUser.bind(this)
    }

    getUser() {
        const username = localStorage.getItem('user')
        const { notify } = this.props
        return <UserDropdown username={username} logout={notify} />
    }

    render() {
        const { login } = this.props
        return (
            <Navbar className='mb-5' bg='dark' variant='dark' expand='lg'>
                <p className='h1 navbar-brand'>React-Bootstrap</p>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                {login ? (
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Link className='nav-link' to={agentRoute}>
                                Mis Agentes
                            </Link>
                            <Link className='nav-link' to={createAgentRoute}>
                                Crear Agente
                            </Link>
                        </Nav>
                        {this.getUser()}
                    </Navbar.Collapse>
                ) : (
                    <></>
                )}
            </Navbar>
        )
    }
}

export default Header
