import React, { useState, useEffect } from 'react'
//import logo from './logo.svg'
import { Router, Route, Switch } from 'react-router-dom'
import './App.css'

import { history } from './services'
import { main, agentRoute, createAgentRoute } from './constants'
import { Header } from './components'
import {
    LoginPage,
    NotFoundPage,
    AgentsPage,
    CreateAgentPage,
    AddBookPage,
} from './pages/'

const App = (props) => {
    const [login, setLogin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setLogin(true)
        }
    }, [])

    const hadleChangeLogin = () => {
        if (login) {
            localStorage.removeItem('user')
        }
        setLogin(!login)
    }

    return (
        <Router history={history}>
            <Header {...props} notify={hadleChangeLogin} login={login} />

            <Switch>
                <Route
                    exact
                    path={main}
                    component={(props) => (
                        <LoginPage
                            {...props}
                            notify={hadleChangeLogin}
                            loggedIn={login}
                        />
                    )}
                />
                <Route
                    exact
                    path={agentRoute}
                    component={(props) => <AgentsPage {...props} login={login} />}
                />
                <Route
                    exact
                    path={createAgentRoute}
                    component={(props) => <CreateAgentPage {...props} login={login} />}
                />
                <Route
                    exact
                    path={`${agentRoute}/:agentType/:agentName`}
                    component={(props) => <AddBookPage {...props} login={login} />}
                />
                <Route exact path='*' component={NotFoundPage} />
            </Switch>
        </Router>
    )
}

export default App
