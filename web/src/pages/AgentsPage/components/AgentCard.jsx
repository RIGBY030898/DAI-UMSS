import React, { Component } from 'react'
import { Card, CardGroup, Row, Col, Button } from 'react-bootstrap'

import { getValueAgentType } from '../../../services'

class AgentCard extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.goMessage = this.goMessage.bind(this)
        this.goAddBook = this.goAddBook.bind(this)
        this.eliminateMe = this.eliminateMe.bind(this)
    }

    goMessage() {}

    goAddBook() {
        const {
            history,
            match: { path },
            name,
            type,
        } = this.props
        history.push(`${path}/${type}/${name}`)
    }

    eliminateMe() {
        const { agentService, name, type } = this.props
        agentService.deleteAgent(type, name)
    }

    render() {
        const { name, type } = this.props
        return (
            <Card>
                <Card.Body>
                    <Card.Title className='text-center'>{name}</Card.Title>
                    <Card.Text>
                        <p>
                            <strong>Nombre: </strong>
                            {name}
                        </p>
                        <p>
                            <strong>Tipo: </strong>
                            {getValueAgentType(type)}
                        </p>
                    </Card.Text>
                    <CardGroup as={Row}>
                        <Col sm={6}>
                            <center>
                                <Button
                                    variant='outline-success'
                                    className='rounded-pill'
                                    onClick={this.goAddBook}
                                >
                                    Añadir Libro
                                </Button>
                            </center>
                        </Col>
                        <Col sm={6}>
                            <center>
                                <Button
                                    variant='outline-danger'
                                    className='rounded-pill'
                                    onClick={this.eliminateMe}
                                >
                                    Eliminar
                                </Button>
                            </center>
                        </Col>
                        <Col sm={12} className='mt-3'>
                            <Button
                                variant='outline-info'
                                className='rounded-pill'
                                onClick={this.goMessage}
                                block
                            >
                                Ver mensajes
                            </Button>
                        </Col>
                    </CardGroup>
                </Card.Body>
            </Card>
        )
    }
}

export default AgentCard
