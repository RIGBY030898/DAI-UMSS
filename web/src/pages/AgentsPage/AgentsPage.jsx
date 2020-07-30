import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { main } from '../../constants'
//import { AgentService } from '../../services'
import { AgentNav } from './components'

class AgentsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        //this.getAgents = this.getAgents.bind(this)
        //this.callback = this.callback.bind(this)

        //this.agentService = new AgentService(this.callback)
    }

    /*componentDidMount() {
        this.getAgents()
    }

    /*getAgents() {
        this.agentService.getAllAgents()
    }*/

    /*callback(args) {
        if (args) {
            console.log('Desde AgentsPage:', args[0])
        }
    }*/

    render() {
        const { login, ...rest } = this.props
        return (
            <>
                {login ? (
                    <Container>
                        <AgentNav {...rest} />
                    </Container>
                ) : (
                    <Redirect to={main} />
                )}
            </>
        )
    }
}

export default AgentsPage
