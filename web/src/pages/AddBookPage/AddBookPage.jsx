import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { main } from '../../constants'
import { Container, Form, Row, Col, Button, Dropdown } from 'react-bootstrap'
import { GoBack } from '../../components'
import { BookService } from '../../services'

class AddBookPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            agentName: '',
            agentType: '',
            book: '',
            price: 1,
        }

        this.submit = this.submit.bind(this)
        this.getBookResponse = this.getBookResponse.bind(this)
        this.handleChangeBook = this.handleChangeBook.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)

        this.bookService = new BookService(this.getBookResponse)
    }

    componentDidMount() {
        const {
            match: {
                params: { agentName, agentType },
            },
        } = this.props
        this.setState({ agentName: agentName, agentType: agentType })
    }

    getBookResponse(args) {
        if (args) {
            const data = args[0]
            const { status, message } = data
            if (status) {
                alert(`Error ${status}: ${message} :(`)
            } else {
                console.log(data)
            }
            console.log('Desde AddBookPage:', data)
        }
    }

    async submit(e) {
        e.preventDefault()
        const { agentName, agentType, book, price } = this.state
        if (book === '') {
            alert('Debe escribir el nombre del libro')
        } else {
            await this.bookService.addBook(agentName, agentType, book, price)
            this.setState({
                book: '',
                price: 1,
            })
        }
    }

    handleChangeBook({ target: { value } }) {
        this.setState({ book: value })
    }

    handleChangePrice({ target: { value } }) {
        this.setState({ price: value })
    }

    render() {
        const { login, history } = this.props
        const { agentName, agentType, book, price } = this.state
        return (
            <>
                {login ? (
                    <Container>
                        <GoBack history={history} />
                        <Row>
                            <Col sm={{ span: 4, offset: 4 }}>
                                <Form onSubmit={this.submit}>
                                    <Form.Group>
                                        <Form.Label>Nombre del agente</Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={agentName}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Tipo de agente</Form.Label>
                                        <Form.Control
                                            type='text'
                                            value={agentType}
                                            disabled
                                        />
                                    </Form.Group>
                                    <Dropdown.Divider />
                                    <Form.Group>
                                        <Form.Label>Nombre del libro</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Ingrese el nombre del libro'
                                            onChange={this.handleChangeBook}
                                            value={book}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Precio del libro</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Ingrese el precio del libro'
                                            min='1'
                                            onChange={this.handleChangePrice}
                                            value={price}
                                        />
                                    </Form.Group>
                                    <Button variant='success' type='submit' block>
                                        Añadir Libro
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

export default AddBookPage
