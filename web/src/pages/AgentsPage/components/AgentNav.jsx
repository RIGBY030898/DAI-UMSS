import React, { Component } from 'react'
import { AgentService } from '../../../services'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { createAgentRoute } from '../../../constants'
import { AgentCard } from '.'

class AgentNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            agents: [],
            show: false,
        }

        this.updateAgents = this.updateAgents.bind(this)
        this.showAgents = this.showAgents.bind(this)

        this.agentService = new AgentService(this.updateAgents)
    }

    componentDidMount() {
        this.agentService.getAllAgents()
    }

    updateAgents(args) {
        if (args) {
            this.setState({
                agents: args[0],
                show: true,
            })
        }
    }

    showAgents() {
        const { agents } = this.state
        if (agents.length > 0) {
            return (
                <Container>
                    <Row>
                        {agents.map(({ agent: { name, type } }) => (
                            <Col xl={4} key={name}>
                                <AgentCard {...this.props} name={name} type={type} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )
        } else {
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <p className='h2'>No tienes agentes</p>

                    <Link className='h3 text-decoration-none' to={createAgentRoute}>
                        Crear un agente
                    </Link>
                </div>
            )
        }
    }

    render() {
        const { show } = this.state
        return (
            <>
                {show ? (
                    <>{this.showAgents()}</>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner className='text-align-center' animation='border' />
                    </div>
                )}
            </>
        )
    }
}

export default AgentNav
