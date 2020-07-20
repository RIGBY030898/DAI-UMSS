import React from 'react'
import logo from './logo.svg'
import { Router, Route, Switch, Link } from 'react-router-dom'
import './App.css'

import { history } from './services'

function App() {
    return (
        <Router history={history}>
            <div
                style={{
                    paddingTop: '1.4em',
                    textAlign: 'center',
                    backgroundColor: '#282c34',
                    fontSize: '1.2rem',
                }}
            >
                <Link
                    className='App-link'
                    to='/'
                    style={{ margin: '1.4rem' }}
                    title='Ir a inicio'
                >
                    Inicio
                </Link>
                <Link
                    className='App-link'
                    to='/about'
                    style={{ margin: '1.4rem' }}
                    title='Ir a Sobre Nosotros'
                >
                    Sobre Nosotros
                </Link>
            </div>

            <Switch>
                <Route
                    exact
                    path='/'
                    component={() => {
                        return (
                            <div className='App'>
                                <header className='App-header'>
                                    <img src={logo} className='App-logo' alt='logo' />
                                    <p>
                                        Edit <code>src/App.js</code> and save to reload.
                                    </p>
                                    <a
                                        className='App-link'
                                        href='https://reactjs.org'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Learn React
                                    </a>
                                </header>
                            </div>
                        )
                    }}
                />
                <Route
                    exact
                    path='/about'
                    component={() => {
                        return (
                            <div className='App-header'>
                                <strong>Sobre Nosotros</strong>
                            </div>
                        )
                    }}
                />
            </Switch>
        </Router>
    )
}

export default App
