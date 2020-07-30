import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Container
            className='pt-5'
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                alignItems: 'center',
            }}
        >
            <div>
                <p className='h3 text-monospace'>Hubo algún error</p>
            </div>
            <h1 className='p-5 bg-dark text-danger text-monospace rounded-pill'>404</h1>
            <div>
                <p className='h4 text-monospace text-danger'>
                    La página no fue encontrada
                </p>
            </div>
            <Link className='h5' style={{ textDecoration: 'none' }} to='/'>
                Volver al inicio
            </Link>
        </Container>
    )
}

export default NotFoundPage
