import React from 'react'

import { Form, Button } from 'react-bootstrap'

const Submit = ({ color, title, message, link, action }) => {
    return (
        <Form.Group>
            <Button className='rounded-pill' variant={color} type='submit' block>
                {title}
            </Button>

            <Form.Text
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                {message}
                <span
                    style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                    className='text-primary'
                    onClick={action}
                >
                    {link}
                </span>
            </Form.Text>
        </Form.Group>
    )
}

export default Submit
