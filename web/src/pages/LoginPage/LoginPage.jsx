import React, { Component } from 'react'
import { UserService } from '../../services'
import { Form, Container, Row, Col } from 'react-bootstrap'

import { agentRoute } from '../../constants'
import { Submit } from './components'
import { Redirect } from 'react-router-dom'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            login: true,
        }

        this.loginAndRegister = this.loginAndRegister.bind(this)
        this.submit = this.submit.bind(this)
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangeLogin = this.handleChangeLogin.bind(this)

        this.userService = new UserService(this.loginAndRegister)
    }

    loginAndRegister(args) {
        const { login } = this.state
        if (login) {
            if (this.userService.isUserAuthenticated()) {
                const { notify } = this.props
                const { history } = this.props
                history.push(agentRoute)
                notify()
            } else {
                alert('El usuario o la contraseña están mal escritos :(')
            }
        } else {
            const { registered } = args[0]
            if (registered) {
                const { notify } = this.props
                notify()
                const { history } = this.props
                history.push(agentRoute)
            } else {
                const { username } = this.state
                alert(`El usuario ${username} ya existe :(`)
            }
        }
    }

    submit(e) {
        e.preventDefault()
        const { username, password, login } = this.state
        if (username === '' || password === '') {
            alert('Los campos no pueden estar vacíos.')
        } else {
            if (login) {
                this.userService.login(username, password)
            } else {
                this.userService.register(username, password)
            }
        }
    }

    handleChangeUsername({ target: { value } }) {
        this.setState({
            username: value,
        })
    }

    handleChangePassword({ target: { value } }) {
        this.setState({
            password: value,
        })
    }

    handleChangeLogin() {
        const { login } = this.state
        this.setState({
            login: !login,
        })
    }

    render() {
        const { username, password, login } = this.state
        const { loggedIn } = this.props
        return (
            <>
                {loggedIn ? (
                    <Redirect to={agentRoute} />
                ) : (
                    <Container>
                        <Row>
                            <Col xl={{ span: 4, offset: 4 }} className='mt-5'>
                                <Form onSubmit={this.submit}>
                                    <Form.Group>
                                        <Form.Label>Nombre de usuario</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Ingrese su nombre de usuario'
                                            onChange={this.handleChangeUsername}
                                            value={username}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Ingrese su contraseña'
                                            onChange={this.handleChangePassword}
                                            value={password}
                                        />
                                    </Form.Group>
                                    {login ? (
                                        <Submit
                                            color='primary'
                                            title='Iniciar Sesión'
                                            message='No tiene cuenta?'
                                            link='Regístrese'
                                            action={this.handleChangeLogin}
                                        />
                                    ) : (
                                        <Submit
                                            color='success'
                                            title='Registrarse'
                                            message='Ya tienes una cuenta?'
                                            link='Inicia Sesión'
                                            action={this.handleChangeLogin}
                                        />
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </>
        )
    }
}

export default LoginPage
