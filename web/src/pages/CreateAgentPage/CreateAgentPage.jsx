import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

import { main } from '../../constants'
import { AgentService } from '../../services'
import { GoBack } from '../../components'

class CreateAgentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            agentName: '',
            agentType: 'buyer',
        }

        this.agentResponse = this.agentResponse.bind(this)
        //this.createAgent = this.createAgent.bind(this)
        this.submit = this.submit.bind(this)
        this.handleChangeAgentType = this.handleChangeAgentType.bind(this)
        this.handleChangeAgentName = this.handleChangeAgentName.bind(this)
        this.resetFields = this.resetFields.bind(this)

        this.agentService = new AgentService(this.agentResponse)
    }

    agentResponse(args) {
        if (args) {
            const data = args[0]
            const { status, message } = data
            if (status) {
                alert(`Error ${status}: ${message} :(`)
            } else {
                const { name } = data
                alert(`El agente ${name} fue creado satisfactoriamente :)`)
                this.resetFields()
            }
        }
    }

    /*async createAgent(agentName, agentType) {
        const data = await this.agentService.createAgent(agentName, agentType)
        const { status, message } = data
        if (status) {
            alert(`Error ${status}: ${message} :(`)
        } else {
            const { name } = data
            alert(`El agente ${name} fue creado satisfactoriamente :)`)
            this.resetFields()
        }
    }*/

    submit(e) {
        e.preventDefault()
        const { agentName, agentType } = this.state
        if (agentName === '') {
            alert('El agente debe tener un nombre')
        } else {
            //this.createAgent(agentName, agentType)
            //this.resetFields()
            this.agentService.createAgent(agentName, agentType)
        }
    }

    handleChangeAgentName({ target: { value } }) {
        this.setState({
            agentName: value,
        })
    }

    handleChangeAgentType({ target: { value } }) {
        this.setState({
            agentType: value,
        })
    }

    resetFields() {
        this.setState({
            agentName: '',
            agentType: 'buyer',
        })
    }

    render() {
        const { agentName, agentType } = this.state
        const { login, history } = this.props
        return (
            <>
                {login ? (
                    <Container>
                        <GoBack history={history} />
                        <Row>
                            <Col sm={{ span: 4, offset: 4 }} className='mt-5'>
                                <Form onSubmit={this.submit}>
                                    <Form.Group>
                                        <Form.Label>Nombre del agente</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Ingrese el nombre del agente'
                                            onChange={this.handleChangeAgentName}
                                            value={agentName}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tipo de agente</Form.Label>
                                        <Form.Control
                                            as='select'
                                            onChange={this.handleChangeAgentType}
                                            value={agentType}
                                        >
                                            <option value='buyer'>Comprador</option>
                                            <option value='seller'>Vendedor</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant='success' type='submit' block>
                                        Crear Agente
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                ) : (
                    <Redirect to={main} />
                )}
            </>
        )
    }
}

export default CreateAgentPage
